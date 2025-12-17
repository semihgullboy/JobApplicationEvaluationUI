import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Link } from '@tanstack/react-router'

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">
                        JobApplicationEvaluation
                    </h1>

                    <nav className="flex gap-6 text-sm text-gray-600">
                        <Link to="/" className="hover:text-gray-900">Anasayfa</Link>
                        <Link to="/companies" className="hover:text-gray-900">Şirketler</Link>
                        <Link to="/login" className="hover:text-gray-900">Giriş</Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto max-w-7xl px-6 py-20 text-center">
                <h2 className="text-4xl font-bold text-gray-900">
                    İş Başvurularını Akıllı Şekilde Değerlendir
                </h2>

                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Başvuruları tek panelden yönet, adayları objektif kriterlerle
                    değerlendir ve en doğru kararı ver.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg">
                        Hemen Başla
                    </Button>

                    <Button variant="outline" size="lg">
                        Daha Fazla Bilgi
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                    <Card>
                        <CardHeader>
                            <CardTitle>Merkezi Yönetim</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Tüm iş başvurularını tek bir panelden kolayca yönetin.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Akıllı Değerlendirme</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Adayları belirlediğiniz kriterlere göre otomatik puanlayın.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hızlı Karar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">
                                Doğru adayı daha kısa sürede seçin.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </section>

            {/* Footer */}
            <footer className="border-t bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500">
                    © 2025 JobApplicationEvaluation. Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    )
}

export default Home
