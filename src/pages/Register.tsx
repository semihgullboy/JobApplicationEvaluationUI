import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff, Briefcase, Phone, User2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiClient, API_ENDPOINTS } from '@/config/api'
import { useRouter } from '@tanstack/react-router'
import { AuthValidation, type RegisterFormInputs } from '@/lib/validation'

const Register = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState('')
    const [apiSuccess, setApiSuccess] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(AuthValidation.registerSchema),
    })

    const onSubmit = async (data: RegisterFormInputs) => {
        setApiError('')
        setApiSuccess('')
        try {
            await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, {
                email: data.email,
                password: data.password,
                fullname: data.fullname,
                phone: data.phone,
            })
            setApiSuccess('Kayıt başarılı. Giriş sayfasına yönlendiriliyorsunuz...')
            setTimeout(() => router.navigate({ to: '/login' }), 800)
        } catch (err: any) {
            const msg: string = err.response?.data?.message || 'Kayıt başarısız. Bilgileri kontrol edin.'
            setApiError(msg)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white p-8">
            <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative flex-col p-12">
                    <div className="flex items-center gap-3 text-white mb-8">
                        <Briefcase size={40} />
                        <span className="text-2xl font-bold">YorumSizden</span>
                    </div>

                    <div className="flex flex-col items-center justify-start flex-1 text-white">
                        <div className="mb-12 p-2 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                            <img
                                src="/loginphoto.jpg"
                                alt="Register illustration"
                                className="w-72 h-72 object-cover rounded-xl shadow-2xl hover:scale-110 hover:brightness-125 transition-all duration-500 cursor-pointer"
                            />
                        </div>

                        <div className="text-center max-w-md">
                            <h2 className="text-3xl font-bold mb-4">Hesabınızı Oluşturun</h2>
                            <p className="text-blue-100 text-lg">
                                Başvuru süreçlerinizi tek panelden yönetin. Bir dakikada kayıt olup başlayın.
                            </p>
                        </div>
                    </div>

                    <div></div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">Kayıt Ol</h1>
                            <p className="text-gray-600">Hesap oluşturarak platformu kullanmaya başlayın</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {apiError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{apiError}</p>
                                </div>
                            )}
                            {apiSuccess && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                    <p className="text-sm text-green-700">{apiSuccess}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                                <div className="relative">
                                    <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        type="text"
                                        placeholder="Adınız Soyadınız"
                                        className="pl-11 h-12"
                                        {...register('fullname')}
                                    />
                                </div>
                                {errors.fullname && (
                                    <p className="text-sm text-red-600 mt-1">{errors.fullname.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        type="email"
                                        placeholder="ornek@mail.com"
                                        className="pl-11 h-12"
                                        {...register('email')}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        type="tel"
                                        placeholder="05xx xxx xx xx"
                                        className="pl-11 h-12"
                                        {...register('phone')}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="******"
                                        className="pl-11 pr-11 h-12"
                                        {...register('password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                            >
                                {isSubmitting ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
                            </Button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Zaten hesabın var mı? <a href="/login" className="font-medium text-blue-600 hover:text-blue-700">Giriş yap</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
