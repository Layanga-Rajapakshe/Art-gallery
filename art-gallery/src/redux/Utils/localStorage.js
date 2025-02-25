// Add a product to localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if (!favorites.some((p) => p.mal_id === product.mal_id)) {
      favorites.push(product);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };
  
  // Remove a product from localStorage
  export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter(
      (product) => product.mal_id !== productId
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  // Retrieve favorites from localStorage
  export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem("favorites");
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
  };
  
  // Get favorites count from localStorage
  export const getFavoritesCount = () => {
    const favorites = getFavoritesFromLocalStorage();
    return favorites.length;
  };
  