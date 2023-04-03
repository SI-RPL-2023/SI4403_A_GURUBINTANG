const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require('body-parser');
const cors = require('cors');

const signupCollection = require("./daftarModel");
const mentorCollection = require("./mentorModel");
const CourseCollection = require("./courseModel");

app.use(cors());
app.use(bodyParser.json());

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) =>{
    res.render("signup");
})

app.get("/addCourse", (req, res) =>{
    res.render("addCourse");
})

app.get("/addMentor", (req, res) =>{
  res.render("addMentor");
})

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
    };
  
    try {
      const result = await signupCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "Signup successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  app.post("/login", async (req, res) => {
    try {
      const data = await signupCollection.findOne({ name: req.body.name });
  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" });
        return;
      }
  
      if (data.password === req.body.password) {
        res.json({ success: true, message: "Login successful", id: data._id, name: data.username});
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/addCourse", async (req, res) => {
    const data = {
      namaKelas: req.body.namaKelas,
      tentangKelas: req.body.tentangKelas,
      fasilitasKelas: req.body.fasilitasKelas,
      materiKelas: req.body.materiKelas,
      mentorKelas: req.body.mentorKelas
    };
  
    try {
      const result = await CourseCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "insert class successful", id: data._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  app.post("/addMentor", async (req, res) => {
    const data = {
      namaMentor: req.body.namaMentor,
      jabatanMentor: req.body.jabatanMentor,
    };
  
    try {
      const result = await mentorCollection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "add mentor successful", id: data._id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
