/* eslint-disable max-len */
class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
          <div id="restaurant-search-container" class="favorite_container">
            <h2>Favorite Restaurant</h2>
            <input type="text" id="query" placeholder="search restaurant" class="input_search">
              <div class="favorite_restaurant" id="favorite"></div>
          </div>
          `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`<li class="restaurant"><span class="restaurant__title">${restaurant.title || '-'}</span></li>`),
        '',
      );
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.querySelector('.restaurants').innerHTML = html;

    document.getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurant:searched:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="movie-item__not__found">Tidak ada film untuk ditampilkan</div>';
  }
}

export default FavoriteRestaurantSearchView;
