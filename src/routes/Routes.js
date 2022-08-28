import Home from '~/pages/Home';
import Rankings from '~/pages/Rankings';
import Newsongs from '~/pages/Newsongs';
import Category from '~/pages/Category';
import Top100 from '~/pages/Top100';
//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/rankings', component: Rankings },
    { path: '/newsongs', component: Newsongs },
    { path: '/category', component: Category },
    { path: '/top100', component: Top100 },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
