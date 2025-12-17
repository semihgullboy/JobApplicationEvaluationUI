import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/useAuth'

const schema = z.object({
    email: z.string().email('Geçerli bir e-posta girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
})

type FormValues = z.infer<typeof schema>

const Login = () => {
    const { login } = useAuth()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '' },
    })

    const onSubmit = async (data: FormValues) => {
        await new Promise(r => setTimeout(r, 600))
        login({ email: data.email })
        alert('Giriş başarılı!')
    }

    return (
        <div className="mx-auto max-w-md px-6 py-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Giriş</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                    <Input type="email" placeholder="ornek@mail.com" {...register('email')} />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                    <Input type="password" placeholder="******" {...register('password')} />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Gönderiliyor...' : 'Giriş Yap'}
                </Button>
            </form>
        </div>
    )
}

export default Login
