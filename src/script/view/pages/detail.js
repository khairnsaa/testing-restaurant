import RestaurantDbSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { renderRestaurantDetailTemplate } from '../templates/template-creator';
import FavoriteRestaurant from '../../data/database';

const Detail = {

  async render() {
    return `
            <section id="restaurantDetail" class="restaurant_detail"></section>
            <div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurantDetail');
    restaurantContainer.innerHTML = renderRestaurantDetailTemplate(restaurant);

    // like button logic
    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurant,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        rating: restaurant.restaurant.rating,
        pictureId: restaurant.restaurant.pictureId,
        city: restaurant.restaurant.city,
        description: restaurant.restaurant.description,
      },
    });
  },

};

export default Detail;
