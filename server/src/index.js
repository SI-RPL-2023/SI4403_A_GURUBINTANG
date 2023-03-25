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
  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
