import { Box, Grid, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ShopContext } from "../context/shopContext";

const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (!products || !products.length > 0) return <div>loading...</div>;

  console.log({ products });

  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)">
        {products.map((product) => {
          return (
            <Link to={`/products/${product.handle}`} key={product.title}>
              <Box _hover={{ opacity: "80%" }} textAlign="center">
                {product.images.length > 0 && (
                  <Image src={product.images[0].src} />
                )}
                <Text>{product.title}</Text>
                <Text>${product.variants[0].price}</Text>
              </Box>
            </Link>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
