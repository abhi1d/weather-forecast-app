const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

// for local system
//const port = 3000
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
console.log('partials path : ' + partialsPath)
console.log('views path : ' + viewsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Abhishek Sharma'
    })
})


app.get('/help', (req,res) => {
    res.render('help', {
        
        title:'Help',
        name:'Abhishek',
        helpText:'Help text.'
    })
})


app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name:'Abhishek Sharma'
    })
})


app.get('/weather', (req,res) => {
   const address = req.query.address
    if (!address) {
        return res.send({
            error:"Please provide an adress"
        })
    } 

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        } 
        
        forecast(data, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            const {summary,temperature,precipProbability} = forecastData
            res.send({
                location:data.location,
                summary,
                temperature,
                precipProbability
            })

        })
    })    
        
    
})

app.get('/products', (req,res) => {
     
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term.'
        })
    } 
    console.log(req.query)

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page',{
        title:'404',
        name:'Abhishek',
        errorMessage:'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404Page',{
        title:'404',
        name:'Abhishek',
        errorMessage:'Page Not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})