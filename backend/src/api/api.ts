import express, {Express, Request, Response} from 'express';
import News from '../utils/news';
const router : Express = express();

// post route with some result of socket
router.get('/news/:q&hl=:hl&gl=:gl', async (req : Request, res : Response) => {
    const {q, hl, gl} = req.params;
    try {
      // get news from web
      const newsData = await News.requestNews({q, hl, gl});
      
      // select data of articles
      const $articles = News.selectArticles(newsData);
      const articles = News.mountStructureNews($articles);

      res.status(200).json(articles)  
    } catch (error) {
      res.status(422).json({error})
    }
})

router.get('/', (req : Request, res : Response) => {
  res.send('Bem-vindo');
})

export default router;