import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});
    const [token, setToken] = useState("");
    const [productList, setProductList] = useState([]);

    const url = "https://shopme-w7oh.onrender.com";

    const addToCart = async (itemId) => {
        const updatedCartItems = {
            ...cartItems,
            [itemId]: (cartItems[itemId] || 0) + 1
        };
        setCartItems(updatedCartItems);

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success("Added to Cart.");
            } catch (error) {
                toast.error("Error Occured.");
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const updatedCartItems = {
            ...cartItems,
            [itemId]: Math.max(0, (cartItems[itemId] || 0) - 1)
        };
        setCartItems(updatedCartItems);

        if (token) {
            try {
                await axios.delete(
                    `${url}/api/cart/remove`,
                    {
                        data: { itemId },
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                toast.success("Removed from Cart.");
            } catch (error) {
                toast.error("Error Occured.");
            }
        }
    };

    const addToWishlist = async (itemId) => {
        const updatedWishlistItems = {
            ...wishlistItems,
            [itemId]: (wishlistItems[itemId] || 0) + 1
        };
        setWishlistItems(updatedWishlistItems);

        if (token) {
            try {
                await axios.post(
                    `${url}/api/wishlist/add`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Added to Wishlist.');
            } catch (error) {
                toast.error('Error Occured.');
            }
        }
    };

    const removeFromWishlist = async (itemId) => {
        const updatedWishlistItems = {
            ...wishlistItems,
            [itemId]: Math.max(0, (wishlistItems[itemId] || 0) - 1)
        };
        setWishlistItems(updatedWishlistItems);

        if (token) {
            try {
                await axios.delete(
                    `${url}/api/wishlist/remove`,
                    {
                        data: { itemId },
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                toast.success("Removed from Wishlist.");
            } catch (error) {
                toast.error("Error Occured.");
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        productList.forEach((product) => {
            if (cartItems[product._id]) {
                totalAmount += product.price * cartItems[product._id];
            }
        });
        return totalAmount;
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/products/get`);
            setProductList(response.data.data);
        } catch (error) {
            console.error("Error fetching product list", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data", error);
        }
    };

    const loadWishlistData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/wishlist/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWishlistItems(response.data.wishListData);
        } catch (error) {
            console.error("Error loading wishlist data", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProductList();
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await loadWishlistData(storedToken);
            }
        };
        loadData();
    }, []);

    const contextValue = {
        productList,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
