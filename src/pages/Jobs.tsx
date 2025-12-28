import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useSectorStore } from '@/store/useSectorStore';
import { useCompanyStore } from '@/store/useCompanyStore';
import { useAuth } from '@/store/useAuth';
import { defaultFilters } from '@/hooks/useCompanyFilters';
import type { FilterFormData } from '@/hooks/useCompanyFilters';

const Jobs = () => {
    const router = useRouter();
    const { getToken } = useAuth();
    const { sectors, loading: sectorsLoading, fetchSectors } = useSectorStore();
    const { companies, totalCount, loading: companiesLoading, filterCompanies } = useCompanyStore();
    const [hasFiltered, setHasFiltered] = useState(false);
    const [page, setPage] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const initialized = useRef(false);
    const pageSize = 9;

    const { register, handleSubmit, reset, watch, getValues, setValue } = useForm<FilterFormData>({
        defaultValues: defaultFilters,
    });

    const formValues = watch();

    const buildRequest = (values: FilterFormData, pageValue: number) => ({
        name: values.company || undefined,
        sectorId: values.sector || undefined,
        minAverageRating: values.minScore,
        maxAverageRating: 5,
        sortBy: values.sortBy,
        sortDesc: values.sortOrder === 'desc',
        page: pageValue,
        pageSize,
    });

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const init = async () => {
            await fetchSectors();
            const initialValues = getValues();
            const payload = buildRequest(initialValues, 1);
            await filterCompanies(payload);
            setHasFiltered(true);
            setPage(1);
            updateUrl(initialValues, 1);
        };

        void init();
    }, [fetchSectors, filterCompanies]);

    const updateUrl = (values: FilterFormData, nextPage: number) => {
        router.navigate({
            to: '/companies',
            replace: true,
            search: () => ({
                page: nextPage,
                pageSize,
                sortBy: values.sortBy,
                sortOrder: values.sortOrder,
                name: values.company || undefined,
                sectorId: values.sector || undefined,
                minScore: values.minScore,
            }),
        });
    };

    const onSubmit = async (data: FilterFormData) => {
        const payload = buildRequest(data, 1);
        await filterCompanies(payload);
        setPage(1);
        setHasFiltered(true);
        updateUrl(data, 1);
    };

    const handleReset = async () => {
        reset(defaultFilters);
        const payload = buildRequest(defaultFilters, 1);
        await filterCompanies(payload);
        setHasFiltered(true);
        setPage(1);
        updateUrl(defaultFilters, 1);
    };

    const applySortBy = async (key: 'Name' | 'Rating' | 'ReviewCount') => {
        setValue('sortBy', key);
        await handleSubmit(onSubmit)();
        updateUrl(getValues(), 1);
    };

    const toggleSortOrder = async () => {
        const current = getValues('sortOrder');
        const next = current === 'asc' ? 'desc' : 'asc';
        setValue('sortOrder', next);
        await handleSubmit(onSubmit)();
        updateUrl(getValues(), 1);
    };

    const loadPage = async (nextPage: number) => {
        const values = getValues();
        const payload = buildRequest(values, nextPage);
        await filterCompanies(payload);
        setPage(nextPage);
        setHasFiltered(true);
        updateUrl(values, nextPage);
    };

    const handleViewComments = (companyId: number) => {
        const token = getToken();
        if (!token) {
            router.navigate({ to: '/login' });
            return;
        }

        router.navigate({
            to: '/reviews-temp',
            search: () => ({ companyId }),
        });
    };

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 p-4 md:p-6 bg-linear-to-br from-blue-50 to-white min-h-screen">
                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden mb-4">
                    <Button
                        type="button"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {filtersOpen ? 'Filtreleri Gizle' : 'Filtreleri Göster'}
                    </Button>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                    {/* Filters Sidebar */}
                    <div className={`w-full lg:w-64 lg:shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
                        <Card className="p-4 md:p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-900">Filtrele</h3>
                                </div>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Şirket Ara</label>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <Input
                                        type="text"
                                        placeholder="Şirket ara..."
                                        className="w-full pl-10"
                                        {...register('company')}
                                    />
                                </div>
                            </div>
                            <hr className="border-gray-200" />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Sektör:</label>
                                <select
                                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-400 transition-colors cursor-pointer"
                                    {...register('sector')}
                                >
                                    <option value="">Tümü</option>
                                    {sectorsLoading ? (
                                        <option disabled>Yükleniyor...</option>
                                    ) : (
                                        sectors.map((sector) => (
                                            <option key={sector.id} value={sector.id}>
                                                {sector.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <hr className="border-gray-200" />

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Ortalama Puan:
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="w-full"
                                    {...register('minScore', { valueAsNumber: true })}
                                />
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>0</span>
                                    <span className="font-semibold text-gray-900">{formValues.minScore.toFixed(1)}</span>
                                    <span>5</span>
                                </div>
                            </div>
                            <hr className="border-gray-200" />

                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={companiesLoading}
                                >
                                    {companiesLoading ? 'Yükleniyor...' : 'Filtrele'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleReset}
                                >
                                    Temizle
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                            <p className="text-sm md:text-base text-gray-600">
                                <span className="font-semibold text-gray-900">{totalCount}</span> tane ilan bulundu
                            </p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                                <div className="flex items-center gap-1 text-xs uppercase tracking-wide text-gray-500 font-semibold">
                                    <span className="h-6 w-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">⇅</span>
                                    <span>Sıralama</span>
                                </div>
                                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                    <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden w-full sm:w-auto">
                                        {(['Name', 'Rating', 'ReviewCount'] as const).map((key) => (
                                            <button
                                                type="button"
                                                key={key}
                                                onClick={() => applySortBy(key)}
                                                className={`flex-1 sm:flex-none px-3 py-2 text-sm font-medium transition-colors ${formValues.sortBy === key ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                                disabled={companiesLoading}
                                            >
                                                {key === 'Name' && 'İsim'}
                                                {key === 'Rating' && 'Puan'}
                                                {key === 'ReviewCount' && 'Değerlendirme'}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={toggleSortOrder}
                                        disabled={companiesLoading}
                                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                                    >
                                        <span className="text-sm font-medium">{formValues.sortOrder === 'asc' ? 'Artan' : 'Azalan'}</span>
                                        <span className="text-lg leading-none">{formValues.sortOrder === 'asc' ? '↑' : '↓'}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {companiesLoading && (
                            <div className="text-center text-gray-500 py-8">
                                Şirketler yükleniyor...
                            </div>
                        )}

                        {hasFiltered && !companiesLoading && companies.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                Filtreleme kriterlerine uygun şirket bulunamadı.
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                            {companies.map((company) => (
                                <Card key={company.id} className="p-4 md:p-5 hover:shadow-lg transition-shadow">
                                    <div className="space-y-3 md:space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-semibold">
                                                🏢
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-base md:text-lg font-semibold text-gray-900 truncate">{company.name}</h4>
                                                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1">
                                                    <span className="inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
                                                        📍 {company.city}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
                                                        🏷️ {company.sectorName}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs md:text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-yellow-600 font-semibold">⭐ {company.averageRating.toFixed(1)}</span>
                                                <span className="text-gray-400">|</span>
                                                <span className="text-gray-600">{company.reviewCount} değerlendirme</span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full border border-blue-500 text-blue-600 bg-white font-semibold text-sm py-2 shadow-sm hover:bg-blue-50 transition-colors"
                                            variant="outline"
                                            type="button"
                                            onClick={() => handleViewComments(company.id)}
                                        >
                                            Yorumları Gör
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 md:gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page === 1 || companiesLoading}
                                    onClick={() => loadPage(Math.max(1, page - 1))}
                                    className="text-xs md:text-sm"
                                >
                                    Önceki
                                </Button>
                                <span className="text-xs md:text-sm text-gray-600">{page} / {totalPages}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages || companiesLoading}
                                    onClick={() => loadPage(Math.min(totalPages, page + 1))}
                                    className="text-xs md:text-sm"
                                >
                                    Sonraki
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Jobs;