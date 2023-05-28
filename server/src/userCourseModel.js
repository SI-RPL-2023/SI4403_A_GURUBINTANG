const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('myCourse connected')
})
.catch((e)=>{
    console.log(e)
})

const userCourseSchema = new mongoose.Schema({
    idKelas:{
        type:String,
        required:true
    },
    idUser:{
        type:String,
        required:true
    },
    isPurchased:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

const userCourseCollection=new mongoose.model('userCourseCollection', userCourseSchema)

module.exports= userCourseCollection

