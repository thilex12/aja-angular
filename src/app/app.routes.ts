import { Routes } from '@angular/router';
import { LoginPage } from '../components/login-page/login-page';
import { NotFoundPage } from '../components/not-found-page/not-found-page';
import { HomePage } from '../components/home-page/home-page';
import { Tag } from '../components/tag/tag';
import { User } from '../components/user/user';
import { Localisation } from '../components/localisation/localisation';
import { TestArnaud } from '../components/test-arnaud/test-arnaud';

export const routes: Routes = [
    {
        path: 'testArnaud',
        component: TestArnaud
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path: 'home',
        component: HomePage,
        children: [
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
            }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
