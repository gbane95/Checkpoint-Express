const express = require("express")
const path = require("path")
const app = express()

// Définir EJS comme moteur de visualisation
app.set("view engine", "ejs")
app.use(express.static("public"))

// Middleware pour vérifier les heures d'ouverture
const checkBusinessHours = (req, res, next) => {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()

  // Vérifiez si c'est du lundi au vendredi entre 9h et 17h
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 23) {
    next();
  } else {
    res.render("closed")
  }
}

// Apply business hours middleware to all routes
app.use(checkBusinessHours)

// Routes
app.get("/", (req, res) => {
  res.render("home")
})

app.get("/services", (req, res) => {
  res.render('services');
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

app.listen(3000, () => console.log("serveur lancé au port 3000"))