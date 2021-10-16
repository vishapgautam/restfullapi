const router=require('express').Router()
const User=require('./../models/User')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')

router.post('/register',async(req,res)=>{
    const newuser= new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
    })
  try{
    const saveduser=await newuser.save()
    res.status(201).json({saveduser})
  }catch(err){res.status(500).json(err)

  }
})

router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if (!user) return res.status(401).json({status:'fail',message:"Invalid creadintials"})
        const hashedPassword= await CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const Originalpassword= hashedPassword.toString(CryptoJS.enc.Utf8);
        if (Originalpassword !==req.body.password ){
           return res.status(401).json({status:'fail',message:"Invalid creadintials"})
        }
        const accesstoken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },process.env.JWT_SECRET,
        {expiresIn:'3d'})

        const {password, ...others}=user._doc
        res.status(200).json({user:others,token:accesstoken})
    }catch(err){res.status(500).json(err)}
})
module.exports=router