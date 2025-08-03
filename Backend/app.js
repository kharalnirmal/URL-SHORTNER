import express from 'express';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/model/shorturl.model.js';

const app = express();
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.post('/', (req, res) => {
  const {url}  = req.body;
  res.send(nanoid(7))
 const shortUrl = nanoid(7);
  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
    clicks: 0,
  });
  newUrl.save()
  ;});

  app.get('/:id', async (req, res) => {
  const { id } = req.params;    
  const url = await urlSchema.findOne({ short_url: id });
if (url){
  res.redirect(url.full_url);
  url.clicks += 1;
}
else {
  res.status(404).send('URL not found');}
});


app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});