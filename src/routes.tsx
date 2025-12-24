import { createRootRoute, createRoute, createRouter, NotFoundRoute } from '@tanstack/react-router'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import { RootLayout } from './components/layout/RootLayout'

const rootRoute = createRootRoute({
    component: RootLayout,
})

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

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: Register,
})

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: Contact,
})

const notFoundRoute = new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: () => <div className="p-8 text-center">Sayfa bulunamadı.</div>,
})

const routeTree = rootRoute.addChildren([indexRoute, jobsRoute, loginRoute, registerRoute, aboutRoute, contactRoute])

export const router = createRouter({
    routeTree,
    notFoundRoute,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
