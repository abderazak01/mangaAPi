const cheerio = require('cheerio');
const axios = require('axios');

const SearchForManga = (req, res) => {
  const MangaDetail = { mangas: [], pages: [] };

  const hero = 'hero';
  /* const { mangaName } = req.params; */
  axios
    .get(`https://teamx.fun/page/7/?s=hero&ixsl=1`)
    .then((response) => {
      const { data } = response;
      const $ = cheerio.load(data);
      $('.thumb a').each((i, ele) => {
        if (i >= 10) return;

        const link = $(ele).attr('href');
        MangaDetail.mangas.push({ link });
      });

      $('.cha_number').each((i, ele) => {
        const chapterNumber = $(ele).text();
        MangaDetail.mangas[i].chapterNumber = chapterNumber;
      });

      $('.info h5 a').each((i, ele) => {
        const name = $(ele).text();
        MangaDetail.mangas[i].name = name;
      });
      $('.wp-pagenavi a').each((i, ele) => {
        const pageNumber = $(ele).text();
        const link = $(ele).attr('href');
        MangaDetail.pages.push({ link, pageNumber });
      });
      const currentPage = $('.current').text();
      MangaDetail.pages.push({ currentPage: currentPage });

      res.status(200).json(MangaDetail);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};
module.exports = SearchForManga;
