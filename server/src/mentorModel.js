const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/GuruBintang")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
})

const MentorSchema = new mongoose.Schema({
    namaMentor:{
        type:String,
        required:true
    },
    jabatanMentor:{
        type:String,
        required:true
    }
});

const MentorCollection=new mongoose.model('mentorCollection', MentorSchema)

module.exports=MentorCollection