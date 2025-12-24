import { Link } from "@tanstack/react-router"

export function Footer() {
    return (
        <footer className="bg-linear-to-br from-blue-50 to-white text-gray-800">
            <div className="mx-auto max-w-7xl px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Sol taraf - Logo ve açıklama */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <img src="/Logo.png" alt="YorumSizden" className="h-8 w-8 rounded-lg object-cover" />
                            <span className="font-bold text-gray-900 text-base">YorumSizden</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Mülakat deneyimlerini paylaş, topluluğa katkı sağla ve iş arayan adaylara yol göster.
                        </p>
                    </div>

                    {/* Topluluk */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-sm">Topluluk</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/companies" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Şirketler
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Şirket */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-sm">Şirket</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Yasal */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-sm">Yasal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Kullanım Şartları
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Çerez Politikası
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Gizlilik Politikası
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Alt çizgi ve copyright */}
                <div className="border-t border-blue-200 pt-6 flex items-center justify-between text-xs text-gray-500">
                    <div>© 2025 JobApplicationEvaluation. Tüm hakları saklıdır.</div>
                    <div className="text-gray-600 font-medium">Türkçe</div>
                </div>
            </div>
        </footer>
    )
}
