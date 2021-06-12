/* eslint-disable max-len */

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

    it('should ask the model to search for restaurants', () => {
      searchRestaurant('restaurant a');
      expect(favoriteRestaurants.searchRestaurant)
        .toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurant([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant').length)
        .toEqual(1);
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }, {
        id: 2,
        title: 'Dua',
      }]);
      expect(document.querySelectorAll('.restaurant').length)
        .toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }]);
      expect(document.querySelectorAll('.restaurant__title')
        .item(0).textContent)
        .toEqual('Satu');
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        title: 'Satu',
      }]);

      expect(document.querySelectorAll('.restaurant__title')
        .item(0).textContent)
        .toEqual('Satu');

      presenter._showFoundRestaurant(
        [{
          id: 1,
          title: 'Satu',
        }, {
          id: 2,
          title: 'Dua',
        }],
      );

      const movieTitles = document.querySelectorAll('.restaurant__title');
      expect(movieTitles.item(0).textContent)
        .toEqual('Satu');
      expect(movieTitles.item(1).textContent)
        .toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurant([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant__title')
        .item(0).textContent)
        .toEqual('-');
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

    it('should show all favorite restaurants', () => {
      searchRestaurant('    ');
      expect(favoriteRestaurants.getAllRestaurant)
        .toHaveBeenCalled();
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

// import FavoriteRestaurantSearchPresenter from '../src/script/view/pages/liked-restaurants/favoriteRestaurantSearchPresenter';
// import FavoriteRestaurant from '../src/script/data/database';
// import FavoriteRestaurantSearchView from '../src/script/view/pages/liked-restaurants/favoriteRestaurantSearchView';

// describe('searhing resto', () => {
//   let presenter;
//   let favoriteRestaurants;
//   let view;

//   const searchRestaurant = (query) => {
//     const queryElement = document.getElementById('query');
//     queryElement.value = query;
//     queryElement.dispatchEvent(new Event('change'));
//   };

//   const searchRestaurantContainer = () => {
//     view = new FavoriteRestaurantSearchView();
//     document.body.innerHTML = view.getTemplate();
//   };

//   const constructPresenter = () => {
//     favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
//     presenter = new FavoriteRestaurantSearchPresenter({
//       favoriteRestaurants: FavoriteRestaurant,
//       view,
//     });
//   };

//   beforeEach(() => {
//     searchRestaurantContainer();
//     constructPresenter();
//   });

//   describe('when query is not empty', () => {
//     it('should be able to capture the query typed by the user', () => {
//       searchRestaurant('restaurant a');

//       expect(presenter.latestQuery)
//         .toEqual('restaurant a');
//     });

//     it('should ask the model to search for restaurant', () => {
//       searchRestaurant('restaurant a');

//       expect(favoriteRestaurants.searchRestaurant)
//         .toHaveBeenCalledWith('restaurant a');
//     });

//     it('should show the found restaurants', () => {
//       presenter._showFoundRestaurant([{ id: 1, title: 'hello' }]);
//       expect(document.querySelectorAll('.restaurants').length).toEqual(1);

//       presenter._showFoundRestaurant([{ id: 1, title: 'satu' }, { id: 2, title: 'dua' }]);
//       expect(document.querySelectorAll('.restaurants > li').length).toEqual(2);
//     });

//     it('should show the title of the found restaurant', () => {
//       presenter._showFoundRestaurant([{ id: 1, title: 'satu' }]);
//       expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('satu');

//       presenter._showFoundRestaurant([{ id: 1, title: 'satu' }, { id: 2, title: 'dua' }]);
//       const restaurantTitles = document.querySelectorAll('.restaurant__title');
//       expect(restaurantTitles.item(0).textContent).toEqual('satu');
//       expect(restaurantTitles.item(1).textContent).toEqual('dua');
//     });

//     it('should show - for found restaurant without title', () => {
//       presenter._showFoundRestaurant([{ id: 1 }]);

//       expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
//     });

//     it('should show the restaurants found by favorite restaurant', (done) => {
//       document.getElementById('restaurant-search-container').addEventListener('restaurants:search:updated', () => {
//         expect(document.querySelectorAll('.restaurant').length).toEqual(3);
//         done();
//       });
//       favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
//         {
//           id: 111, title: 'restaurant a',
//         },
//         {
//           id: 222, title: 'restaurant ab',
//         },
//         {
//           id: 333, title: 'restaurant abc',
//         },
//       ]);

//       searchRestaurant('restaurant a');
//     });

//     it('should show the name of the restaurant found by favorite restaurant', (done) => {
//       document.getElementById('restaurant-search-container').addEventListener('restaurants:search:updated', () => {
//         const restaurantTitles = document.querySelectorAll('.restaurant__title');
//         expect(restaurantTitles.item(0).textContent).toEqual('restaurant a');
//         expect(restaurantTitles.item(1).textContent).toEqual('ini namanya restaurant ab');
//         expect(restaurantTitles.item(2).textContent).toEqual('kalo ini restaurant abc');

//         done();
//       });

//       favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
//         {
//           id: 111, title: 'restaurant a',
//         },
//         {
//           id: 222, title: 'ini namanya restaurant ab',
//         },
//         {
//           id: 333, title: 'kalo ini restaurant abc',
//         },
//       ]);

//       searchRestaurant('restaurant a');
//     });
//   });

//   describe('when query is empty', () => {
//     it('should capture the query as empty', () => {
//       searchRestaurant(' ');
//       expect(presenter.latestQuery.length).toEqual(0);

//       searchRestaurant('     ');
//       expect(presenter.latestQuery.length).toEqual(0);

//       searchRestaurant('\t');
//       expect(presenter.latestQuery.length).toEqual(0);
//     });

//     it('should show all favorite restaurants', () => {
//       searchRestaurant('  ');

//       expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
//     });
//   });

//   describe('when favorite restaurant could not be found', () => {
//     it('should show an empty message', (done) => {
//       document.getElementById('restaurant-search-container').addEventListener('restaurants:search:updated', () => {
//         expect(document.querySelectorAll('.restaurant__not__found').length).toEqual(1);
//         done();
//       });
//       favoriteRestaurants.searchRestaurant.withArgs('restaurant cde')
//         .and
//         .returnValues([]);

//       searchRestaurant('restaurant cde');
//     });
//     it('should not show any restaurant', (done) => {
//       document.getElementById('restaurant-search-container')
//         .addEventListener('restaurants:search:updated', () => {
//           expect(document.querySelectorAll('.restaurant').length).toEqual(0);
//           done();
//         });
//       favoriteRestaurants.searchRestaurant.withArgs('restaurant cde')
//         .and
//         .returnValues([]);

//       searchRestaurant('restaurant cde');
//     });
//   });
// });
