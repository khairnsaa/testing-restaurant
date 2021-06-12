import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';
import FavoriteRestaurant from '../src/script/data/database';

describe('Favorite Restaurant Idb Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurant.getAllRestaurant()).forEach(async (resto) => {
      await FavoriteRestaurant.deleteRestaurant(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteRestaurant);
});
