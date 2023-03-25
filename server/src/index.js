const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

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

app.post("/signup", async (req, res) => {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };
  
    try {
      const result = await collection.insertMany(data);
      console.log(result);
      res.json({ success: true, message: "Signup successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  app.post("/login", async (req, res) => {
    try {
      const data = await collection.findOne({ name: req.body.name });
  
      if (!data) {
        res.status(401).json({ success: false, message: "Invalid username or password" });
        return;
      }
  
      if (data.password === req.body.password) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  const course = [
    {
       Name: 'Bahasa Indonesia',
       Level: 'SD',
       Mentor: 'Annisa Miswanda',
       TotalClasses: 3
    },
    {
        Name: 'Matematika',
        Level: 'SMA',
        Mentor: 'Usein Akbar',
        TotalClasses: 5
    },
    {
        Name: 'Sains',
        Level: 'SMP',
        Mentor: 'Ammirahma Hamida',
        TotalClasses: 4
    },
  ];
  
  app.get('/course', (req, res) => {
    res.json(course);
  });

  const mentor = [
    {
       MentorName: 'Annisa Miswanda',
       LastEdu: 'S2 Bahasa Inggris'
    },
    {
        MentorName: 'Ammirahma Hamida',
        LastEdu: 'S2 Bioteknologi'
    },
    {
        MentorName: 'Usein Akbar',
        LastEdu: 'S2 Matematika'
    }
  ];
  
  app.get('/mentor', (req, res) => {
    res.json(mentor);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
