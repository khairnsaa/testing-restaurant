import LikeButtonPresenter from '../../src/script/utils/like-button-presenter';
import FavoriteRestaurant from '../../src/script/data/database';

const createLikeButtonPresenterWithResto = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurants: FavoriteRestaurant,
    restaurant,
  });
};

export { createLikeButtonPresenterWithResto };
