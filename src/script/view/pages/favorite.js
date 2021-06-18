import FavoriteRestaurant from '../../data/database';
import { renderRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-restaurants/favoriteRestaurantSearchView';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurant.getAllRestaurant();
    const restaurantsContainer = document.getElementById('favorite');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += renderRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
