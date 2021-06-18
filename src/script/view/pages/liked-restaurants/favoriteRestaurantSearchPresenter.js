class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._view = view;
    this._listenToSearchQueryByUser();
    this._favoriteRestaurants = favoriteRestaurants;
  }

  _listenToSearchQueryByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  get latestQuery() {
    return this._latestQuery;
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurant;
    if (this._latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurant.searchRestaurant(this._latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurant.getAllRestaurant();
    }

    this._showFoundRestaurant(foundRestaurant);
    document.getElementById('restaurant-search-container').dispatchEvent(new Event('restaurants:search:updated'));
  }
}

export default FavoriteRestaurantSearchPresenter;
