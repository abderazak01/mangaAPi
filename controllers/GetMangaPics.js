const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  const { chapter, mangaName } = req.params;
  const chapters = [];
  try {
    /* const { data } = await axios.get(`https://teamx.fun/${chapter}/`); */
    const { data } = await axios.get(
      `https://mnhaestate.com/series/${mangaName}/${chapter}`
    );
    const $ = cheerio.load(data);

    $('.image_list img').each((i, ele) => {
      const chapterImg = $(ele).attr('src');
      chapters.push(chapterImg);
    });
    res.status(200).json(chapters);
  } catch (error) {
    console.log(error.message);
  }
};
