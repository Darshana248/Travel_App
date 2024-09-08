const Wishlist = require("../model/wishlist.model");

const createWishlistHandler = async (req, res) => {
    const newWishlist = new Wishlist(req.body);
    try{
        const savedwishlist = await newWishlist.save();
        res.status(201).json(savedwishlist);
    }catch(err){
        res.status(500).json({message:"Failed to create wishlist"});
    }
}

const deleteWishlistHandler = async (req, res) => {
    try{
        await Wishlist.findByIdAndDelete(req.params.id);
        res.json({message: "Hotel deleted from wishlist"});
    }catch(err){
        res.status(500).json({message:"Could not delet hotel from wishlist"});
    }
    
}

const getWishlistHandler = async (req, res) =>{
    try{
        const wishlist = await Wishlist.find({});
        wishlist ? res.json(wishlist) : res.json({message: "No item found in wishlist"})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {createWishlistHandler, deleteWishlistHandler, getWishlistHandler};