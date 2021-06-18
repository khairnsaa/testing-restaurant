import FavoriteRestaurantSearchPresenter from '../src/script/view/pages/liked-restaurants/favoriteRestaurantSearchPresenter';
import FavoriteRestaurant from '../src/script/data/database';
import FavoriteRestaurantSearchView from '../src/script/view/pages/liked-restaurants/favoriteRestaurantSearchView';

describe('searching resto', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('restaurant a');
      expect(presenter.latestQuery)
        .toEqual('restaurant a');
    });

    it('should show - for found restaurant without title', () => {
      document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');
      });

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 4444 },
      ]);
    });

    it('should show the restaurant found by Favorite Movies', () => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length)
            .toEqual(3);
        });
      favoriteRestaurants.searchRestaurant.withArgs('restaurant a')
        .and
        .returnValues([
          {
            id: 111,
            title: 'restaurant abc',
          },
          {
            id: 222,
            title: 'ada juga restaurant abcde',
          },
          {
            id: 333,
            title: 'kalo ini restaurant a',
          },
        ]);
      searchRestaurant('restaurant a');
    });

    it('should show the name of the movies found by Favorite restaurants', () => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const RestaurantTitles = document.querySelectorAll('.restaurant__title');
          expect(RestaurantTitles.item(0).textContent)
            .toEqual('restaurant abc');
          expect(RestaurantTitles.item(1).textContent)
            .toEqual('ada juga restaurant abcde');
          expect(RestaurantTitles.item(2).textContent)
            .toEqual('ini juga boleh restaurant a');
        });

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a')
        .and
        .returnValues([
          {
            id: 111,
            title: 'restaurant abc',
          },
          {
            id: 222,
            title: 'ada juga restaurant abcde',
          },
          {
            id: 333,
            title: 'ini juga boleh restaurant a',
          },
        ]);

      searchRestaurant('restaurant a');
    });
  });

  describe('when query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurant(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('     ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', () => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurants__not__found').length)
            .toEqual(1);
          done();
        });
      favoriteRestaurants.searchRestaurant.withArgs('restaurant a')
        .and
        .returnValues([]);

      searchRestaurant('restaurant a');
    });

    it('should not show any restaurant', () => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length)
            .toEqual(0);
          done();
        });

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a')
        .and
        .returnValues([]);

      searchRestaurant('restaurant a');
    });
  });
});
