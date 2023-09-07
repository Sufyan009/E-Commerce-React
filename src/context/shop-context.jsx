import { createContext, useState } from "react";
import React from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};



export const ShopContextProvider = (props) => {

  const [cartItem, setCartItem] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItem[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItem((previous) => ({
      ...previous,
      [itemId]: previous[itemId] + 1,
    }));
  };
  const removeFromCart = (itemId) => {
    setCartItem((previous) => ({
      ...previous,
      [itemId]: previous[itemId] - 1,
    }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const checkout = () => {
    setCartItem(getDefaultCart());
  };

  const contextValue = {
    cartItem,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    checkout,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
