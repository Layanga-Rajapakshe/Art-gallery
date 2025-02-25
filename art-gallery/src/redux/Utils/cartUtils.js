export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  export const updateCart = (state) => {
    // Calculate the items price
    state.itemsPrice = addDecimals(
      state.cartItems.reduce((acc, item) => acc + 58 * item.qty, 0)
    );
  
    // Calculate the shipping price
    state.shippingPrice = addDecimals(58 > 100 ? 0 : 10);
  
    // Calculate the tax price
    state.taxPrice = addDecimals(Number((0.15 * 58).toFixed(2)));
  
    // Calculate the total price
    state.totalPrice = (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2);
  
    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state));
  
    return state;
  };

  //get cart items from cart in local storage
export const getCartItems = () => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : { cartItems: [] };
  };

  //get count of items in cart
export const getCartCount = () => {
    return getCartItems().cartItems.reduce((acc, item) => acc + item.qty, 0);
  };
