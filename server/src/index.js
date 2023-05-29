const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const authCollection = require("./authModel")
const mentorCollection = require("./mentorModel")
const CourseCollection = require("./courseModel")
const CheckoutCollection = require("./checkoutModel")
const myCourseCollection = require("./userCourseModel")


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

app.get("/course/:idCourse", async (req, res) => {
  try {
    const data = await CourseCollection.findOne({ _id: req.params.idCourse })
    if (!data) {
      res.status(404).json({ success: false, message: "data empty" })
      return
    }
    res.json({ data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
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

app.get("/mentor/:idMentor", async (req, res) => {
  try {
    const data = await mentorCollection.findOne({ _id: req.params.idMentor })
    if (!data) {
      res.status(404).json({ success: false, message: "data empty" })
      return
    }
    res.json({ data })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
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

  app.put("/edit/user/:idUser", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user"
    }
  
    try {
      const result = await authCollection.findOneAndUpdate({ _id: req.params.idUser }, data)
      console.log(result)
      res.json({ success: true, message: "Profile Updated!" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })  

  app.put("/edit/user/:idMentor", async (req, res) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "mentor"
    }
  
    try {
      const result = await authCollection.findOneAndUpdate({ _id: req.params.idMentor }, data)
      console.log(result)
      res.json({ success: true, message: "Profile Updated!" })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })  


  app.delete("/deleteCourse/:idCourse", async (req, res) =>{
    const idCourse = req.params.idCourse

    try {
      const result = await CourseCollection.findOneAndRemove({_id: idCourse})
      console.log(result)
      res.json({success: true, message:"Course Deleted!"})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error"})
    }
  })



  app.post("/addCourse/:idMentor", async (req, res) => {
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      introductionKelas: req.body.introductionKelas,
      kategoriKelas: req.body.kategoriKelas,
      materiKelas: req.body.materiKelas,
      hargaCoretKelas:req.body.hargaCoretKelas,
      hargaAsliKelas:req.body.hargaAsliKelas,
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
  app.put("/editCourse/:idMentor", async (req, res) =>{
    const idKelas = req.body.idKelas
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      introductionKelas: req.body.introductionKelas,
      kategoriKelas: req.body.kategoriKelas,
      materiKelas: req.body.materiKelas,
      hargaCoretKelas:req.body.hargaCoretKelas,
      hargaAsliKelas:req.body.hargaAsliKelas,
      idMentor: req.params.idMentor
    }

    try {
      const result = await CourseCollection.findOneAndUpdate({_id: idKelas}, data)
      console.log(result)
      res.json({success: true, message:"Course "+data.namaKelas+" Updated!"})
    } catch(error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error"})
    }
  })
  app.delete("/deleteCourse/:idCourse", async (req, res) =>{
    const idCourse = req.params.idCourse

    try {
      const result = await CourseCollection.findOneAndRemove({_id: idCourse})
      console.log(result)
      res.json({success: true, message:"Course Deleted!"})
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error"})
    }
  })

  app.post('/checkout', async (req, res) => {
    const data = {
      idKelasCheckout:req.body.idKelasCheckout,
      idUserCheckout:req.body.idUserCheckout,
      timestamp: Date.now(),
      deadline:req.body.deadline,
      buktiBayar:req.body.buktiBayar,
      idMentor:req.body.idMentor,
      isPurchased: false
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

  app.get("/checkout/mentor/:idMentor", async (req, res) => {
    try {
      const data = await CheckoutCollection.find({ idMentor: req.params.idMentor })
      if (!data) {
        res.status(404).json({ success: false, message: "data empty" })
        return
      }
      res.json({ data })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.get("/checkout/:idUserCheckout", async (req, res) => {
    try {
      const data = await CheckoutCollection.find({ idUserCheckout: req.params.idUserCheckout })
      if (!data) {
        res.status(404).json({ success: false, message: "data empty" })
        return
      }
      res.json({ data })
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  
  app.post("/checkout/mentor/:idMentor/:idCheckout", async (req, res) => {
    try {
      const query = { idMentor: req.params.idMentor, _id: req.params.idCheckout }
      const update = { isPurchased: true }
      const options = { new: true }
  
      const checkoutData = await CheckoutCollection.findOneAndUpdate(query, update, options)
  
      if (!checkoutData) {
        res.status(404).json({ success: false, message: "Data not found" })
        return
      }
  
      if (checkoutData.isPurchased) {
        const courseData = {
          idUser: checkoutData.idUserCheckout,
          idKelas: checkoutData.idKelasCheckout,
          isPurchased: checkoutData.isPurchased,
          feedbackRating: 0,
          feedbackComment: " ",
          status: "Progress"
        }
  
        const result = await myCourseCollection.insertMany(courseData)
        console.log(result)
      }
  
      res.json({ success: true, message: "Checkout updated successfully", data: checkoutData })
  
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  
  app.get("/mycourse/:idUser", async (req, res) => {
    try {
      const data = await myCourseCollection.find({ idUser: req.params.idUser })
  
      if (data.length === 0) {
        res.status(404).json({ success: false, message: "Data not" })
        return
      }
  
      res.json({ data })
  
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })

  app.put("/mycourse/feedback/:idMyCourse", async (req, res) => {
    const idMyCourse = req.params.idMyCourse
    const { feedbackRating, feedbackComment } = req.body
  
    try {
      const updatedCourse = await myCourseCollection.findByIdAndUpdate(
        idMyCourse,
        { $set: { feedbackRating, feedbackComment, status: "finished" } },
        { new: true }
      )
  
      if (updatedCourse) {
        res.json({ success: true, message: "Feedback updated!", course: updatedCourse })
      } else {
        res.status(404).json({ success: false, message: "Course not found" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
  


app.listen(3000, () => {
  console.log("Server is running on port 3000")
})