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
        type:Date,
        required:true
    },
    buktiBayar:{
        type:String,
        required:false
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

