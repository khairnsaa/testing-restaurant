const assert = require('assert');

Feature('Liking Restaurant');

Before((I) => {
  I.amOnPage('/');
});

Scenario('liking one restaurant', async (I) => {
  I.seeElement('.explore_restaurant_name a');
  const firstRestaurant = locate('.explore_restaurant_name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // go to restaurant detail
  I.seeElement('.explore_restaurant_btn');
  I.click('.explore_restaurant_btn');

  // clicking like button
  I.seeElement('#likeButtonContainer');
  I.click('#likeButton');

  // go to favorite page
  I.amOnPage('/#/favorite');
  I.seeElement('.favorite_restaurant');
  const likedRestaurantTitle = await I.grabTextFrom('.explore_restaurant_name');

  // checking the restaurant name
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking restaurant', async (I) => {
  I.seeElement('.explore_restaurant_name a');
  const firstRestaurant = locate('.explore_restaurant_name a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // go to restaurant detail
  I.seeElement('.explore_restaurant_btn');
  I.click('.explore_restaurant_btn');

  // clicking like button
  I.seeElement('#likeButtonContainer');
  I.click('#likeButton');

  // go to favorite page
  I.amOnPage('/#/favorite');
  I.seeElement('.favorite_restaurant');
  const likedRestaurantTitle = await I.grabTextFrom('.explore_restaurant_name');

  // checking the restaurant name
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // unliking restaurant
  I.seeElement('.explore_restaurant_btn');
  I.click('.explore_restaurant_btn');

  I.seeElement('#likeButtonContainer');
  I.click('#likeButton');

  // checking theres no liked restaurant
  I.amOnPage('/#/favorite');
  I.dontSee('.favorite_restaurant');
});
