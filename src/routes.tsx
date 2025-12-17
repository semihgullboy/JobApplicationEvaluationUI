import { createRootRoute, createRoute, createRouter, NotFoundRoute } from '@tanstack/react-router'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/Login'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
})

const jobsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/companies',
    component: Jobs,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
})

const notFoundRoute = new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: () => <div className="p-8 text-center">Sayfa bulunamadı.</div>,
})

const routeTree = rootRoute.addChildren([indexRoute, jobsRoute, loginRoute])

export const router = createRouter({
    routeTree,
    notFoundRoute,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
