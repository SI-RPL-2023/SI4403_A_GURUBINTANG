const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('mentor connected')
})
.catch((e)=>{
    console.log(e)
})

const MentorSchema = new mongoose.Schema({
    idMentor:{
        type:String,
        required:true
    },
    namaMentor:{
        type:String,
        required:true
    },
    jumlahKelas:{
        type:Number,
        required:true
    }
})

const MentorCollection=new mongoose.model('mentorCollection', MentorSchema)

module.exports=MentorCollection