import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getRestaurant(id) {
    if (!id) return;

    return favoriteRestos.find((resto) => resto.id === id);
  },

  getAllRestaurant() {
    return favoriteRestos;
  },

  putRestaurant(resto) {
    if (!resto.hasOwnProperty('id')) return;

    if (this.getRestaurant(resto.id)) return;

    favoriteRestos.push(resto);
  },

  deleteRestaurant(id) {
    favoriteRestos = favoriteRestos.filter((resto) => resto.id !== id);
  },

  searchRestaurant(query) {
    return this.getAllRestaurant().filter((restaurant) => {
      const loweredCaseTitle = (restaurant.title || '=').toLowerCase();
      const jammedTitle = loweredCaseTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Restaurant Idb Test Implementation', () => {
  afterEach(() => favoriteRestos = []);

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});
