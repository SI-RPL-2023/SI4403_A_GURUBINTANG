const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('course connected')
})
.catch((e)=>{
    console.log(e)
})

const CourseSchema = new mongoose.Schema({
    namaKelas:{
        type:String,
        required:true
    },
    tentangKelas:{
        type:String,
        required:true
    },
    introductionKelas:{
        type:String,
        required:true
    },
    kategoriKelas:{
        type:String,
        required:true
    },
    materiKelas:{
        type:String,
        require:true
    },
    hargaCoretKelas:{
        type:Number,
        required:true
    },
    hargaAsliKelas:{
        type:Number,
        required:true
    },
    idMentor:{
        type:String,
        required:true
    },
    feedbackRating:{
        type:Array,
        required:false
    },
    feedbackComment:{
        type:Array,
        required:false
    }

})

const CourseCollection=new mongoose.model('courseCollection', CourseSchema)

module.exports=CourseCollection

