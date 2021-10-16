const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],
    amount:{type:Number,required:true},
    address:{type:Object,reqiured:true},
    status:{type:String,ddefault:"Pending"},
    
},{timestamps:true}
);
module.exports=mongoose.model('Order',orderSchema)