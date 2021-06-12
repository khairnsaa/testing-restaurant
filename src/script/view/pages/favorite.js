import FavoriteRestaurant from '../../data/database';
import { renderRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
            <section class="favorite_container">
                <h2>Favorite Restaurant</h2>

                <div class="favorite_restaurant" id="favorite"></div>
            </section>
        `;
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
