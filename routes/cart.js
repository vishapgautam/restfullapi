const Cart = require('../models/Cart');
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require('./verifyToken')
const router=require('express').Router()




router.post("/",verifyToken,async (req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const savedCart=await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
      res.status(500).json(err)
    }
})



router.patch('/:id',verifyTokenAndAuthorization ,async(req,res)=>{
     try{
         const updateCart=await Cart.findByIdAndUpdate(req.params.id,{
             $set:req.body
         },{new:true})
         res.status(200).json(updateCart)
     }catch(err){res.status(403).json(err)}
})




router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart is deleted")
    }catch(err){
        res.status(500).json(err)
    }
} )


router.get('/find/:id',verifyTokenAndAuthorization ,async(req,res)=>{
    try{
        const Cart=await Cart.findById(req.params.id)
        res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const carts=await Cart.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }
} )



module.exports=router