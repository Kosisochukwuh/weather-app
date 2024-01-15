import express from 'express';
import axios from 'axios';
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index", {weather: null, error: null});
});

app.get("/weather", async (req,res) => {
    const city = req.query.city;
    const apiKey = "bb7f28c1af7023a005d604318ccdf476";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let weather;
    let error = null;

    try{
        const response = await axios.get(url);
        weather = response.data;
    }catch (error) {
        weather = null;
        error = "Error, Please try again";
    }

    res.render("index", {weather, error});
})

// This below checks the enviromental Variable before assigning the port
// const port = process.env.PORT || 5000;

const port = 5000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});