import { Routes } from '@angular/router';
import { LoginPage } from '../components/login-page/login-page';
import { NotFoundPage } from '../components/not-found-page/not-found-page';
import { HomePage } from '../components/home-page/home-page';
import { Tag } from '../components/tag/tag';
import { User } from '../components/user/user';
import { Localisation } from '../components/localisation/localisation';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'tag',
        component: Tag,
    },
    {
        path: 'user',
        component: User,
    },
    {
        path: 'event',
        component: Event
    },
    {
        path: 'localisation',
        component: Localisation
    },
    {
        path: 'not-found',
        component: NotFoundPage
    },
    {
        path: '**',
        redirectTo: 'not-found',
    }
];
