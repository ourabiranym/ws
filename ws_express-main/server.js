const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
// building middleware
const verifyTime = (req, res, next) => {
  const currentHour = new Date().getHours();
  if (currentHour < 9 || currentHour >= 17) {
    return res
      .status(403)
      .send("Service unavailable, try again between 9AM and 5PM");
  }
  next();
}; 

app.use(verifyTime); 


//routing
app.get("/", (req, res) => {
  res.render("home", { layout: false });
});

app.get("/service", (req, res) => {
  res.render("service", { layout: false });
});
app.get("/contact", (req, res) => {
  res.render("contact", { layout: false });
});

app.listen(5000, () => {
  console.log("Server is listening.....");
});
