const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const authCollection = require("./authModel")
const mentorCollection = require("./mentorModel")
const CourseCollection = require("./courseModel")
const CheckoutCollection = require("./checkoutModel")


app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/course", (req, res)=>{
    try {
      CourseCollection.find().then(data => {
        res.json({
          data
        })
      })
    } catch (error) {
      // catch error
    }
})

app.get("/mentor", (req, res)=>{
  try {
    mentorCollection.find().then(data => {
      res.json({
        data
      })
    })
  } catch (error) {
    // catch error
  }
})

app.post("/signup", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user"
    }
  
    try {
      const result = await authCollection.insertMany(data)
      console.log(result)
      res.json({ success: true, message: "Signup successful", id: data._id, email: data.email, role: data.role })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.post("/signup/mentor", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "mentor"
    }
  
    try {
      const result = await authCollection.insertMany(data)
      console.log(result)
      res.json({ success: true, message: "Signup successful", id: data._id, email: data.email, role: data.role})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  
  
  app.post("/login", async (req, res) => {
    try {
      const data = await authCollection.findOne({ email: req.body.email })
  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" })
        return
      }
  
      if (data.password === req.body.password && data.role === "user") {
        res.json({ success: true, message: "Login successful", id: data._id, username: data.username, role: data.role})
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  app.post("/login/mentor", async (req, res) => {
    try {
      const data = await authCollection.findOne({ email: req.body.email })  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" })
        return
      }
  
      if (data.password === req.body.password && data.role === "mentor") {
        res.json({ success: true, message: "Login successful", id: data._id, username: data.username, role: data.role})
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.post("/addCourse/:idMentor", async (req, res) => {
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      kategoriKelas: req.body.kategoriKelas,
      materiKelas: req.body.materiKelas,

      totalmateriKelas: req.body.totalmateriKelas,
      hargacoretKelas:req.body.hargacoretKelas,
      hargaasliKelas:req.body.hargaasliKelas,
      mentorKelas: req.body.mentorKelas,
      idMentor: req.params.idMentor
    }
  
    try {
      const result = await CourseCollection.insertMany(data)
      console.log(result)
      res.json({ success: true, message: "insert "+data.namaKelas+" class successful", id: data._id })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  }) 
  app.put("/editCourse", async (req, res) =>{
    const namaKelas = req.body.namaKelas
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      kategoriKelas: req.body.kategoriKelas,
      materiKelas: req.body.materiKelas,
      totalmateriKelas: req.body.totalmateriKelas,
      hargacoretKelas:req.body.hargacoretKelas,
      hargaasliKelas:req.body.hargaasliKelas,
      mentorKelas: req.body.mentorKelas
    }

    try {
      const result = await CourseCollection.findOneAndUpdate({namaKelas: namaKelas}, data)
      console.log(result)
      res.json({success: true, message:"Course "+data.namaKelas+" Updated!"})
    } catch(error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error"})
    }
  })
  app.delete("/deleteCourse", async (req, res) =>{
    const namaKelas = req.body.namaKelas

    try {
      const result = await CourseCollection.findOneAndRemove({namaKelas: namaKelas})
      console.log(result)
      res.json({success: true, message:"Course Deleted!"})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error"})
    }
  })

  app.post("/addMentor", async (req, res) => {
    const data = {
      namaMentor: req.body.namaMentor,
      jabatanMentor: req.body.jabatanMentor,
    }
    
    try {
      const result = await mentorCollection.insertMany(data)
      console.log(result)
      res.json({ success: true, message: "add mentor successful", id: data._id})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.post('/checkout', async (req, res) => {
    const data = {
      idKelasCheckout:req.body.idKelasCheckout,
      idUserCheckout:req.body.idUserCheckout,
      timestamp:req.body.timestamp,
      deadline:req.body.deadline,
      buktiBayar:req.body.buktiBayar,
      idMentor:req.body.idMentor,
      isPurchased:false
    }

    try {
      const result = await CheckoutCollection.insertMany(data)
      console.log(result)
      res.json({ success: true, message: "checkout succesfull"})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.get("/checkout/admin/:idMentor", async (req, res) => {
    try {
      const data = await CheckoutCollection.findOne({ idMentor: req.params.idMentor })
      if (!data) {
        res.status(404).json({ success: false, message: "data empty" })
        return
      }
      res.json({ data })
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  
  app.post("/checkout/admin/:idMentor/:idCheckout", async (req, res) => {
    try {
      const query = { idMentor: req.params.idMentor, _id: req.params.idCheckout }
      const update = { isPurchased: true }
      const options = { new: true }
  
      const data = await CheckoutCollection.findOneAndUpdate(query, update, options)
  
      if (!data) {
        res.status(404).json({ success: false, message: "Data not found" })
        return
      }
  
      res.json({ success: true, message: "Checkout updated successfully", data })
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })  


  

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})