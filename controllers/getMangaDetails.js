const cheerio = require('cheerio');
const axios = require('axios');

const getMangaDetails = (req, res) => {
  const MangaDetail = {
    tags: [],
    story: '',
    cover: '',
    name: '',
    chapters: [],
  };

  const { mangaName } = req.params;
  axios
    .get(`https://mnhaestate.com/series/${mangaName}`)
    .then((response) => {
      const { data } = response;
      const $ = cheerio.load(data);
      const img = $('.text-right img').attr('src');
      MangaDetail.cover = img;
      //////////////-----------////////////////
      const name = $('.author-info-title h1').text();
      /* const namme = name.replace(/\s/g, '-'); */
      MangaDetail.name = name;
      //////////////-----------////////////////
      const story = $('.review-content p').text();
      MangaDetail.story = story;
      //////////////-----------////////////////

      $('.eplister a').each((i, ele) => {
        const LinkOfchapter = $(ele).attr('href');
        MangaDetail.chapters.push({ link: LinkOfchapter });
      });

      $('.epl-title').each((i, ele) => {
        const nameOfChapter = $(ele).text();
        MangaDetail.chapters[i].name = nameOfChapter;
      });
      $('.review-author-info a').each((i, ele) => {
        const tag = $(ele).text();
        MangaDetail.tags.push(tag);
      });

      res.json(MangaDetail);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = getMangaDetails;
