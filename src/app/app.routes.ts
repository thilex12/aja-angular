import { Routes } from '@angular/router';
import { LoginPage } from '../components/login-page/login-page';
import { NotFoundPage } from '../components/not-found-page/not-found-page';
import { HomePage } from '../components/home-page/home-page';
import { TagsPage } from '../components/tags-page/tags-page';
import { UsersPage } from '../components/users-page/users-page';
import { LocalisationsPage } from '../components/localisations-page/localisations-page';
import { EventsPage } from '../components/events-page/events-page';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'tags',
        component: TagsPage,
    },
    {
        path: 'users',
        component: UsersPage,
    },
    {
        path: 'events',
        component: EventsPage,
    },
    {
        path: 'localisations',
        component: LocalisationsPage,
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
