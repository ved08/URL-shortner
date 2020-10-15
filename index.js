const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const Url = require('./models/model.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


const DBuri = 'mongodb://ved08:ved08@sandbox-shard-00-00.zp39c.mongodb.net:27017,sandbox-shard-00-01.zp39c.mongodb.net:27017,sandbox-shard-00-02.zp39c.mongodb.net:27017/URLshortner?ssl=true&replicaSet=atlas-knuhwi-shard-0&authSource=admin&retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
app.post('/add-url', (req, res) => {
  console.log(req.body);
  const shortner = new Url({
    url: req.body.url,
    keyword: req.body['url-slug']
  })
  Url.find({"keyword": req.body['url-slug']})
  .then(result => {
    if(result == false) {
      shortner.save()
      .then(result => res.send(`<h1>Saved! Go to <a href="/${result.keyword}">/${result.keyword}</a> to visit the website.</h1>`))
      .catch(err => console.log("error occured"))
    } else {
      res.send("Url slug already taken, please use a different url slug. <a href='/'>Go back</a>")
    }
  })
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/:keyword', (req, res) => {
  Url.find({"keyword": req.params.keyword})
    .then(data => {
      if(data == false) {
        setTimeout(() => {
          res.redirect('/')
        }, 1000);
      }
      res.redirect(data[0].url)
      // console.log(data[0].url)
    })
    .catch(err => console.log(err))
})
const port = 3000
mongoose.connect(DBuri, options) 
  .then(() => app.listen(port))
  .catch(err => console.log(err));

