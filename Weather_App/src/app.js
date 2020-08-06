const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials") 

const app = express();
const port = process.env.PORT || 3333

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(
  express.static(publicDir)
)



app.get('', (req, res) => {
  if (!req.query.address) {
    res.render('index',{
      title: "Home",
    })
  }else{
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {

        if (error) {
              return res.send({ error })
          }

          if(forecastData){
            res.send({
              title: "Home",
              weather: forecastData.current.weather_descriptions[0],
              temperature: forecastData.current.temperature,
              region: forecastData.location.region,
              country: forecastData.location.country,
              city: req.query.address
            })
          }
      })
  })
  }
})

app.get("/about", 
  (request, response) => {

    response.render('about',{
      title: "About"
    })
  }
)

app.get("/about/*", 
  (request, response) => {
    response.render('about',{
      title: "About"
    })
  }
)


app.get('*', 
  (request, response) => {
    response.render('index', {
      title: "Home"
    });
  }
)


app.listen(port, 
  () => console.log("Server up!")
);