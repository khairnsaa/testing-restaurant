import Detail from '../view/pages/detail';
import Favorite from '../view/pages/favorite';
import Home from '../view/pages/home';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
