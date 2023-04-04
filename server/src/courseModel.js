const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
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
    kategoriKelas:{
        type:String,
        required:true
    },
    materiKelas:{
        type:String,
        require:true
    },
    totalmateriKelas:{
        type:Number,
        required:true
    },
    hargacoretKelas:{
        type:Number,
        required:true
    },
    hargaasliKelas:{
        type:Number,
        required:true
    },
    mentorKelas:{
        type:String,
        require:true
    }
})

const CourseCollection=new mongoose.model('courseCollection', CourseSchema)

module.exports=CourseCollection

