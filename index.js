const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const productsRoute=require('./routes/products')
const orderRoute=require('./routes/order')
const cartRoute=require('./routes/cart')

dotenv.config();

mongoose
        .connect(process.env.MONGO_URL)
        .then(result=>{console.log("DB connection is successful")})
        .catch(err=>{console.log(err)})
app.use(express.json())
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products',productsRoute)
app.use('api/carts',cartRoute)
app.use('/api/orders',orderRoute)
app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listining on port ${process.env.PORT}.....`)
})