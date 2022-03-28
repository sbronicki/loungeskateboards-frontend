import React, { createContext, useContext, useEffect, useState } from "react";
import Client from "shopify-buy";

export const ShopContext = createContext();

const client = Client.buildClient({
  domain: process.env.LOUNGE_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.LOUNGE_SHOPIFY_API,
});

const ShopProvider = ({ children }) => {
  // state
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // effects
  useEffect(() => {
    if (!localStorage.checkoutId) {
      createCheckout();
    } else {
      fetchCheckout(localStorage.checkoutId);
    }
  }, []);

  // funcs
  const createCheckout = () => {
    client.checkout.create().then((_checkout) => {
      console.log(_checkout);
      localStorage.setItem("checkoutId", _checkout.id);
      setCheckout(_checkout);
    });
  };

  const fetchCheckout = (checkoutId) => {
    client.checkout.fetch(checkoutId).then((_checkout) => {
      setCheckout(_checkout);
    });
  };
  const addItemToCheckout = async () => {};
  const removeLineItem = async (lineItemIds) => {};
  const fetchAllProducts = () => {
    client.product.fetchAll().then((products) => {
      console.log(products);
      setProducts(products);
    });
  };
  const fetchProductByHandle = (handle) => {
    client.product.fetchByHandle(handle).then((product) => {
      console.log(product);
      setProduct(product);
    });
  };
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ShopContext.Provider
      value={{
        product: { ...product },
        products: [...products],
        checkout: { ...checkout },
        isCartOpen: isCartOpen,
        isMenuOpen: isMenuOpen,
        fetchAllProducts: fetchAllProducts,
        fetchProductByHandle: fetchProductByHandle,
        toggleCart: toggleCart,
        toggleMenu: toggleMenu,
        addItemToCheckout: addItemToCheckout,
        removeLineItem: removeLineItem,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const ShopConsumer = ShopContext.ShopConsumer;

export default ShopProvider;
