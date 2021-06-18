import CONFIG from '../../global/config';

const renderRestaurantDetailTemplate = (restaurant) => {
  console.log(restaurant.restaurant);
  return `
        <h2>${restaurant.restaurant.name}</h2>
            <div class="restaurant_detail_wrapper">
                <div class="resto_img">
                    <img src="${CONFIG.BASE_IMG_URL + restaurant.restaurant.pictureId}" alt="${restaurant.name}">
                </div>
                <div class="resto_detail">
                    <div class="resto_review">
                        <h3 class="content_review">"${restaurant.restaurant.customerReviews[0].review}"</h3> 
                        <p class="reviewer_name">- ${restaurant.restaurant.customerReviews[0].name} -</p>
                    </div>
                    <p class="resto_rating"><i class="fas fa-star"></i>${restaurant.restaurant.rating}</p>
                    <p class="resto_address_txt">address :</p>
                    <p class="resto_address">${restaurant.restaurant.address}</p>
                    <p class="resto_category_txt">Category Menu :</p>
                    <p class="resto_category">${restaurant.restaurant.categories.map((category) => `<span>${category.name}</span>`).join(' ')}</p>
                    <div class="resto_food_menu">
                        <h3>Food Menu</h3>
                        <ul>
                            ${restaurant.restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="resto_drink_menu">
                        <h3>Drink Menu</h3>
                        <ul>
                        ${restaurant.restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="more_reviews">
                        <h2>More Reviews</h2>
                        ${restaurant.restaurant.customerReviews.map((review) => `
                                <div class="review_card">
                                    <h3>${review.name === undefined ? 'anon' : review.name}</h3>
                                    <p>${review.review === undefined ? '-' : review.review} </p>
                                </div>
                            `).join('')}
                        
                    </div>
                </div>
            </div>
        </section>
    `;
};

const renderRestaurantItemTemplate = (restaurant) => `
    <div class="explore_wrapper">
        <div class="explore_restaurant_img">
            <img class="lazyload" data-src="${CONFIG.BASE_IMG_URL + restaurant.pictureId}" alt="${restaurant.name}">
        </div>
        <div class="details">
            <h2 class="explore_restaurant_name"><a href="#">${restaurant.name}</a></h2>
            <p class="explore_restaurant_detail">${restaurant.description}</p>
            <p class="explore_restaurant_city"><i class="fas fa-map-marker-alt"></i> ${restaurant.city}</p>
            <p class="explore_restaurant_rating"><i class="fas fa-star"></i> ${restaurant.rating} </p>
            <a href="#/detail/${restaurant.id}" class="explore_restaurant_btn">Detail</a>
        </div>
`;

const renderLikeButton = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
`;

const renderLikedButton = () => `
    <button aria-label="dislike this restaurant" id="likeButton" class="like">
        <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
`;

export {
  renderRestaurantDetailTemplate, renderRestaurantItemTemplate, renderLikeButton, renderLikedButton,
};
