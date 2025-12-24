import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiClient, API_ENDPOINTS } from '@/config/api'
import { useAuth } from '@/store/useAuth'
import { useRouter, Link } from '@tanstack/react-router'
import { decodeTokenName } from '@/lib/utils'
import { AuthValidation, type LoginFormInputs } from '@/lib/validation'

const Login = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(AuthValidation.loginSchema),
    })

    const onSubmit = async (data: LoginFormInputs) => {
        setApiError('')

        try {
            const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, null, {
                params: {
                    email: data.email,
                    password: data.password,
                },
            })

            const { data: resData, success, message } = response.data

            if (success && resData?.token) {
                const name = decodeTokenName(resData.token)
                login({ email: data.email, name }, resData.token)
                router.navigate({ to: '/' })
            } else {
                setApiError(message || 'Giriş başarısız')
            }
        } catch (err: any) {
            setApiError(err.response?.data?.message || 'Giriş başarısız. E-posta ve şifreyi kontrol edin.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white p-8">
            <div className="flex max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative flex-col p-12">
                    <div className="flex items-center gap-3 text-white mb-8">
                        <img src="/Logo.png" alt="YorumSizden" className="h-12 w-12 rounded-full object-cover" />
                        <span className="text-2xl font-bold">YorumSizden</span>
                    </div>

                    <div className="flex flex-col items-center justify-start flex-1 text-white">
                        <div className="mb-12 p-2 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                            <img
                                src="/loginphoto.jpg"
                                alt="Login illustration"
                                className="w-72 h-72 object-cover rounded-xl shadow-2xl hover:scale-110 hover:brightness-125 transition-all duration-500 cursor-pointer"
                            />
                        </div>

                        <div className="text-center max-w-md">
                            <h2 className="text-3xl font-bold mb-4">İş Başvurularınızı Yönetin</h2>
                            <p className="text-blue-100 text-lg">
                                İş başvurularınızı takip edin, değerlendirin ve kariyerinizi bir adım öteye taşıyın.
                                Yapay zeka destekli sistem ile en uygun adayları bulun.
                            </p>
                        </div>
                    </div>

                    <div></div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="w-full max-w-md">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">Hoşgeldiniz</h1>
                            <p className="text-gray-600">Devam etmek için hesabınıza giriş yapın</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {apiError && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{apiError}</p>
                                </div>
                            )}

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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <Input
                                        type={showPassword ? "text" : "password"}
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
                                {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                            </Button>
                        </form>

                        <div className="mt-8 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">veya şununla devam et</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Gmail</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-600">
                            Hesabın hala yok mu? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">Kayıt ol</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
