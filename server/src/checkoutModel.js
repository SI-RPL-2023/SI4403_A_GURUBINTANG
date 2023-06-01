const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('checkout connected')
})
.catch((e)=>{
    console.log(e)
})

const CheckoutSchema = new mongoose.Schema({
    
    idKelasCheckout:{
        type:String,
        required:true
    },
    idUserCheckout:{
        type:String,
        required:true
    },
    timestamp:{
        type:Number,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    buktiBayar:{
        type: String
    },
    idMentor:{
        type:String,
        required:true
    },
    isPurchased:{
        type:Boolean,
        required:true
    } 
    
})

const CheckoutCollection=new mongoose.model('checkoutCollection', CheckoutSchema)

module.exports=CheckoutCollection

