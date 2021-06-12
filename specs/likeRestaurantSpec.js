import LikeButtonPresenter from '../src/script/utils/like-button-presenter';
import FavoriteRestaurant from '../src/script/data/database';
import * as TestFactories from './helpers/testFactories';

const addLikeButton = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

beforeEach(() => {
  addLikeButton();
});

describe('Liking A Restaurant', () => {
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });
  it('should not show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="dislike this restaurant"]')).toBeFalsy();
  });
  it('should be able to like restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteRestaurant.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    FavoriteRestaurant.deleteRestaurant(1);
  });
  it('should not like restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await FavoriteRestaurant.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);

    FavoriteRestaurant.deleteRestaurant(1);
  });
  it('should not add restaurant when it has no id', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurant,
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
