import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Building2, Menu, ChevronDown, LogOut } from 'lucide-react'
import { useMemo, useState, useRef, useEffect } from 'react'
import { useAuth } from '@/store/useAuth'
import { apiClient, API_ENDPOINTS } from '@/config/api'

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const profileMenuRef = useRef<HTMLDivElement>(null)
    const { user, logout } = useAuth()

    const avatarText = useMemo(() => {
        if (!user) return ''
        const text = (user.name || user.email || '').trim()
        return text.slice(0, 2).toUpperCase()
    }, [user])

    const handleLogout = () => {
        apiClient.post(API_ENDPOINTS.AUTH_LOGOUT).catch(() => { })
        logout()
        setMobileMenuOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setProfileMenuOpen(false)
            }
        }

        if (profileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [profileMenuOpen])

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-3">
                {/* Desktop Header */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 flex-1">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">YorumSizden</span>
                        </Link>
                    </div>

                    <nav className="flex items-center gap-3 text-xs font-medium text-gray-700">
                        <Link
                            to="/"
                            className="relative px-1 py-0.5 transition-colors hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 hover:after:scale-x-100"
                        >
                            Anasayfa
                        </Link>
                        <Link
                            to="/companies"
                            className="relative px-1 py-0.5 transition-colors hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 hover:after:scale-x-100"
                        >
                            Şirketler
                        </Link>
                        <Link
                            to="/about"
                            className="relative px-1 py-0.5 transition-colors hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 hover:after:scale-x-100"
                        >
                            Hakkımızda
                        </Link>
                        <Link
                            to="/contact"
                            className="relative px-1 py-0.5 transition-colors hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200 hover:after:scale-x-100"
                        >
                            İletişim
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3 flex-1 justify-end">
                        {!user ? (
                            <>
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="h-7 px-3 text-[11px]">Giriş Yap</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm" className="h-7 px-3 text-[11px] bg-blue-600 text-white hover:bg-blue-700">Kayıt Ol</Button>
                                </Link>
                            </>
                        ) : (
                            <div className="relative" ref={profileMenuRef}>
                                <button
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                                        {avatarText}
                                    </div>
                                    <span className="text-xs font-medium text-gray-800">{user.name}</span>
                                    <ChevronDown size={16} className={`text-gray-600 transition-transform ${profileMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {profileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-xs font-semibold text-gray-900">{user.name}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <LogOut size={16} />
                                            Çıkış Yap
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                <Building2 className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">YorumSizden</span>
                        </Link>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-blue-600"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="mt-4 pb-4 border-t pt-4 space-y-3">
                            <Link
                                to="/"
                                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Anasayfa
                            </Link>
                            <Link
                                to="/companies"
                                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Şirketler
                            </Link>
                            <Link
                                to="/about"
                                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Hakkımızda
                            </Link>
                            <Link
                                to="/contact"
                                className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                İletişim
                            </Link>
                            {!user ? (
                                <div className="flex flex-col gap-2 pt-3">
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button variant="outline" size="sm" className="w-full">Giriş Yap</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                                        <Button size="sm" className="w-full bg-blue-600 text-white hover:bg-blue-700">Kayıt Ol</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 pt-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
                                        {avatarText}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-semibold text-gray-800">{user.name || user.email}</div>
                                        <div className="text-xs text-gray-500">Profilim</div>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={handleLogout}>Çıkış</Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
