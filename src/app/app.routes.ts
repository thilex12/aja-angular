import { Routes } from '@angular/router';
import { LoginPage } from '../components/login-page/login-page';
import { NotFoundPage } from '../components/not-found-page/not-found-page';
import { HomePage } from '../components/home-page/home-page';
import { TagsPage } from '../components/tags-page/tags-page';
import { UsersPage } from '../components/users-page/users-page';
import { LocalisationsPage } from '../components/localisations-page/localisations-page';
import { EventsPage } from '../components/events-page/events-page';
import { authGuard } from '../guards/auth-guard';
// import { LogoutPage } from '../components/logout-page/logout-page';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    // {
    //     path: 'logout',
    //     component: LogoutPage,
    // },
    {
        path: '',
        component: HomePage,
        canActivate: [authGuard]
    },
    {
        path: 'tags',
        component: TagsPage,
        canActivate: [authGuard]
    },
    {
        path: 'users',
        component: UsersPage,
        canActivate: [authGuard]
    },
    {
        path: 'events',
        component: EventsPage,
        canActivate: [authGuard]
    },
    {
        path: 'localisations',
        component: LocalisationsPage,
        canActivate: [authGuard]
    },
    {
        path: 'not-found',
        component: NotFoundPage,
    },
    {
        path: '**',
        redirectTo: 'not-found',
    }
];
