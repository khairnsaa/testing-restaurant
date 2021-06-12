const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the movie that has been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });

    expect(await favoriteResto.getRestaurant(1))
      .toEqual({ id: 1 });
    expect(await favoriteResto.getRestaurant(2))
      .toEqual({ id: 2 });
    expect(await favoriteResto.getRestaurant(3))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteResto.putRestaurant({ aProperty: 'property' });

    expect(await favoriteResto.getAllRestaurant()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });

    expect(await favoriteResto.getAllRestaurant()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });
    favoriteResto.putRestaurant({ id: 3 });

    await favoriteResto.deleteRestaurant(1);

    expect(await favoriteResto.getAllRestaurant()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should handle request to remove a movie even though the restaurant has not been added', async () => {
    favoriteResto.putRestaurant({ id: 1 });
    favoriteResto.putRestaurant({ id: 2 });
    favoriteResto.putRestaurant({ id: 3 });

    await favoriteResto.deleteRestaurant(4);

    expect(await favoriteResto.getAllRestaurant())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
  it('should be able to search for restaurant', async () => {
    favoriteResto.putRestaurant({ id: 1, title: 'restaurant a' });
    favoriteResto.putRestaurant({ id: 2, title: 'restaurant b' });
    favoriteResto.putRestaurant({ id: 3, title: 'restaurant abc' });
    favoriteResto.putRestaurant({ id: 4, title: 'restaurant ayeaye' });

    expect(await favoriteResto.searchRestaurant('restaurant a'))
      .toEqual([
        { id: 1, title: 'restaurant a' },
        { id: 3, title: 'restaurant abc' },
        { id: 4, title: 'restaurant ayeaye' },
      ]);
  });
};

export { itActsAsFavoriteRestoModel };
