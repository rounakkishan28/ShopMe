import User from "../models/User.js";

// add items to user wish list
const addToWishlist = async(req,res)=>{
    try{
        let userData=await User.findById(req.body.userId);
        let wishListData=await userData.wishListData;
        if(!wishListData[req.body.itemId]){
            wishListData[req.body.itemId]=1;
        } else {
            res.json({success: false, message: "Already added to wishlist."});
        }
        await User.findByIdAndUpdate(req.body.userId, { wishListData });
        res.json({success: true, message: "Added to wishlist."});
    } catch (error) {
        res.json({success: false, message: "Error"});
    }
}

// remove items from user wishlist
const removeFromWishlist = async (req, res) => {
    try{
        let userData = await User.findById(req.body.userId);
        let wishListData=await userData.wishListData;
        if(!wishListData[req.body.itemId]>0){
            res.json({success: false, message: "Not present in wishlist."});
        } else {
            wishListData[req.body.itemId]-=1;
        }
        await User.findByIdAndUpdate(req.body.userId, { wishListData });
        res.json({ success: true, message: "Remove from cart."});
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
}

// fetch user wishlist
const getWishlist=async(req,res)=>{
    try{
        let userData=await User.findById(req.body.userId);
        let wishListData=await userData.wishListData;
        res.json({ success: true, wishListData });
    } catch(error) {
        res.json({ success: false, message: "Error" });
    }
}

export { addToWishlist, removeFromWishlist, getWishlist }