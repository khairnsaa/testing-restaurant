import RestaurantDbSource from '../../data/restaurantdb-source';
import { renderRestaurantItemTemplate } from '../templates/template-creator';

const Home = {

  async render() {
    return `
        <section class="hero">
            <div class="hero_img">
                <h1 class="hero_title">Find your own <br>Favorite Restaurant</h1>
            </div>
            <p class="hero_subtitle">Parfect Res is a company who already travel around indonesia and bring you a curated selections of the best restaurant</p>
            <a href="#explore" class="hero_browse">Browse Restaurant</a>
        </section>

        <main id="explore" class="explore_restaurants">
            <h1 class="explore_restaurant_title">Explore Restaurant</h1>
            <div class="explore_wrap"></div>
        </main>
        `;
  },

  async afterRender() {
    const restaurantLists = await RestaurantDbSource.restaurantList();
    console.log(restaurantLists);
    const restaurantContainer = document.querySelector('#mainContent');
    restaurantLists.forEach((restaurant) => {
      restaurantContainer.innerHTML += renderRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
