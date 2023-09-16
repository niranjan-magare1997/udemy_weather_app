const path = require('path');
const express = require("express");
const hbs = require('hbs')

const getForecast = require('./utils/getForeCast')

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

//Define paths for expres config
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App index page",
        name: "Niranjan Magare"
    });
})
 
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Weather App help page",
        name: "Niranjan Magare"
    });
})

app.get('/help/*', (req, res) => {
    // res.send(`Help Article not found`)
    res.render('404', {
        title: "Help Article not found",
        name: "Niranjan Magare"
    })
})

app.get('/about', (req, res) => {
    // res.send("<h1>About Page!</h1>")
    res.render('about', {
        title: "Weather app about page",
        name: "Niranjan Magare"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "Please provide location in the query."
        })
    }

    getForecast.getForecast(req.query.location, (response) => {
        res.send(response)
    })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessafe: "Please provide search text."
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    // res.send("This page is not exists, 404")
    res.render('404', {
        title: "404 page",
        name: "Niranjan Magare"
    })
})

app.listen(3000, () => {
    console.log("Server is up and running on port 3000")
});