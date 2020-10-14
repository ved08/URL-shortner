const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Url = require('./models/test.js')

const app = express();
// app.use(bodyParser.json())


const DBuri = 'mongodb+srv://m001-student:m001-student@sandbox.zp39c.mongodb.net/URLshortner?retryWrites=true&w=majority';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
app.get('/', (req, res) => {
  const shortner = new Url({
    url: 'https://google.com',
    keyword: 'googlee'
  })
  // shortner.save()
  // .then(result => res.send(result))
  // .catch(err => console.log(err));
  Url.find({"keyword":"google"})
  .then(data => {
    if (data == false) {
      shortner.save()
      .then(resp => console.log('Saved'))
    } else res.send(data)
  })
  .catch(data => res.send('Error'))
})
app.get('/:keyword', (req, res) => {
  Url.find({"keyword": req.params.keyword})
    .then(data => {
      if(data == false) {
        res.send("Please enter a valid param")
      }
      res.redirect(data[0].url)
    })
})


mongoose.connect(DBuri, options)
  .then(() => app.listen(process.env.PORT))