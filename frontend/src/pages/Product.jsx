import React, { useContext, useState } from 'react';
import ProductList from '../components/ProductList.jsx';
import ProductItem from '../components/ProductItem.jsx';
import { StoreContext } from '../context/storeContext.jsx';

const Product = () => {
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const { productList } = useContext(StoreContext);

    return (
        <div className="container mx-auto px-4">

            <div className="mt-6 mx-4 sm:mx-16">
                <input
                    type='text'
                    placeholder='Search products'
                    className='p-2 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mb-4 border border-stone-400 rounded-md outline-violet-500 transition duration-200 ease-in-out hover:border-violet-400 focus:border-violet-500'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ProductList category={category} setCategory={setCategory} />

            <div className="mt-8 px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
                    {productList
                        .filter((item) => {
                            if (searchTerm === "") return item;
                            else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.category.toLowerCase().includes(searchTerm.toLowerCase())) return item;
                            return null;
                        })
                        .map((item, index) => {
                            if (category === "All" || category === item.category) {
                                return (
                                    <ProductItem
                                        key={index}
                                        id={item._id}
                                        name={item.name}
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                    />
                                );
                            }
                            return null;
                        })}
                </div>
            </div>
        </div>
    );
};

export default Product;
