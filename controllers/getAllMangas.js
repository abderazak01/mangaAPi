const cheerio = require('cheerio');
const axios = require('axios');
const getAllMangas = async (req, res) => {
  const mangas = [];
  try {
    const { data } = await axios.get(
      `https://mnhaestate.com/series?page=${req.query.page}`
    );
    const $ = cheerio.load(data);
    //grabing the data
    $('.limit img').each((i, ele) => {
      const img = $(ele).attr('src');
      mangas.push({ img: img });
    });
    $('.bsx a').each((i, ele) => {
      const link = $(ele).attr('href');
      const name = $(ele).attr('title');
      mangas[i].link = link;
      mangas[i].name = name;
    });

    res.json(mangas);
  } catch (error) {
    console.log('error : ', error.message);
  }
};
module.exports = getAllMangas;
