import FavoriteRestaurant from '../src/script/data/database';
import * as TestFactories from './helpers/testFactories';

const addLikeButton = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButton();
    await FavoriteRestaurant.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurant.deleteRestaurant(1);
  });
  it('should show the dislike button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="dislike this restaurant"]')).toBeTruthy();
  });
  it('should not show the like button when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });
  it('should be able to remove liked restaurant form the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
    document.querySelector('[aria-label="dislike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
  it('should should not throw error if the unliked movie is not on the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });
    await FavoriteRestaurant.deleteRestaurant(1);
    document.querySelector('[aria-label="dislike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
