const express = require("express");
const { redirect } = require("express/lib/response");

const app = express();

let tasks = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    let today = new Date();
    let currentDay = today.getDay();

    

    let options = {
        weekday: "long", 
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options)
   

    res.render('list', {listTitle: day, newListItems: tasks})
});

app.post("/", (req, res) => {
    let task = req.body.newTask;
    let title = req.body.submit;

    console.log(req.body)

    if (title === "Work List") {
        workItems.push(task);
        res.redirect("/work");
    } else {
        tasks.push(task);
        res.redirect("/")
    }
    
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", (req, res) => {
    let task = res.body.newTask
    if (task !== "") {
        workItems.push(item);
    }
    res.redirect("/work")
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})