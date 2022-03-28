import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const Product = () => {
  const { handle } = useParams();

  const { fetchProductByHandle, addItemToCheckout, product } =
    useContext(ShopContext);

  useEffect(() => {
    fetchProductByHandle(handle);
  }, []);

  if (!product) return <div>loading...</div>;

  return <div>{product.title}</div>;
};

export default Product;
