// cartUtils.js - Utility functions for cart management

/**
 * Adds an item to the cart in localStorage
 * @param {Object} item - The item to add to the cart
 */
export const addToCart = (item) => {
    try {
      // Get current cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Increase quantity if item already in cart
        currentCart[existingItemIndex].quantity += 1;
      } else {
        // Add new item to cart with quantity 1
        currentCart.push({
          ...item,
          quantity: 1
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      return { success: true, message: 'Item added to cart' };
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return { success: false, message: 'Failed to add item to cart' };
    }
  };
  
  /**
   * Updates the quantity of an item in the cart
   * @param {number|string} id - The ID of the item to update
   * @param {number} quantity - The new quantity value
   */
  export const updateCartItemQuantity = (id, quantity) => {
    try {
      // Get current cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        const updatedCart = currentCart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        // Update quantity
        const updatedCart = currentCart.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      return { success: false };
    }
  };
  
  /**
   * Removes an item from the cart
   * @param {number|string} id - The ID of the item to remove
   */
  export const removeCartItem = (id) => {
    try {
      // Get current cart from localStorage
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Filter out the item with the matching ID
      const updatedCart = currentCart.filter(item => item.id !== id);
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return { success: false };
    }
  };
  
  /**
   * Gets the current cart from localStorage
   * @returns {Array} The cart items array
   */
  export const getCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  };
  
  /**
   * Calculate cart totals based on current cart items
   * @returns {Object} Cart totals object
   */
  export const calculateCartTotals = () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Calculate items price (subtotal)
      const itemsPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      
      // Calculate shipping price (example: free shipping over $100, otherwise $10)
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      
      // Calculate tax (example: 8% tax rate)
      const taxRate = 0.08;
      const taxPrice = itemsPrice * taxRate;
      
      // Calculate total price
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      
      return {
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };
    } catch (error) {
      console.error('Error calculating cart totals:', error);
      return {
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0
      };
    }
  };
  
  /**
   * Clears the entire cart
   */
  export const clearCart = () => {
    localStorage.setItem('cart', '[]');
  };