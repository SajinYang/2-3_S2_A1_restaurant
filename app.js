const express = require('express')
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

//require restaurantList API
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))


// routes setting >> index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// routes setting >> show
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantData = restaurantList.results.find(item => item.id.toString() === req.params.restaurantId)
  res.render('show', { restaurant: restaurantData })
})

// routes setting >> search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLocaleLowerCase().trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword) || restaurant.category.toLocaleLowerCase().includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

