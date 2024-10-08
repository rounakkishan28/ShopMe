import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import ProductList from '../components/ProductList.jsx';
import ProductDisplay from '../components/ProductDisplay.jsx';

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ProductList category={category} setCategory={setCategory} />
      <ProductDisplay category={category} />
    </div>
  )
}

export default Home;
