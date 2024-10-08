import React, { useContext } from 'react';
import { StoreContext } from '../context/storeContext.jsx';
import ProductItem from './ProductItem.jsx';

const ProductDisplay = ({ category }) => {
  const { productList } = useContext(StoreContext);

  return (
    <div className="mt-8 mx-4 sm:mx-12 px-4 md:px-8">
      <h2 className="text-2xl font-semibold text-center sm:text-left">Our popular products</h2>
      
      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
        {productList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              // <div key={index}>
                <ProductItem 
                  key={index}
                  id={item._id} 
                  name={item.name} 
                  description={item.description} 
                  price={item.price} 
                  image={item.image} 
                />
              // </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;

