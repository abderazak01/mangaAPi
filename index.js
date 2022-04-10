const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const getAllManga = require('./controllers/getAllMangas.js');
const getMangaDetails = require('./controllers/getMangaDetails');
const getPics = require('./controllers/GetMangaPics');
/* const cloudinary = require('cloudinary'); */

const port = process.env.PORT || 7000;
const app = express();
app.use(cors());
app.listen(port, () => {
  console.log(`running on port ${port} `);
});

app.get('/', async (req, res) => {
  const mangas = [];
  try {
    const { data } = await axios.get('https://teamx.fun/manga/');
    const $ = cheerio.load(data);
    //grabing the data
    $('.thumb img').each((i, ele) => {
      const img = $(ele).attr('src');
      mangas.push({ img: img });
    });
    $('.thumb h3 a').each((i, ele) => {
      const link = $(ele).attr('href');
      const name = $(ele).text();
      mangas[i].link = link;
      mangas[i].name = name;
    });

    res.json(mangas);
  } catch (error) {
    console.log('error : ', error.message);
  }
});

app.get('/details/:mangaName', () => {
  getMangaDetails();
});
app.get('/details/:mangaName/:chapter', () => {
  getPics();
});
