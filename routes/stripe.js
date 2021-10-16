const router=requore('express').Router()
const stripe=require('stripe')(process.env.STRIPE_KEY)


router.post('/payment',(req,res)=>{
    stripe.charges.create(
        {
            source:req.body.tokenId,
            amount:req.body.amount,
            currency:'usd',
        },
        (stripeErr,stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr)
            }else{
                res.status(200).json(stripeRes)
            }
        }
    )
})

//stripe payment part is just incomplete rest of the all is complete and working

module.exports=router