import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import News from './utils/news';

const PORT = 3000;
const app : Express = express();

app.use(express.json());
app.use(cors());

// post route with some result of socket
app.get('/news/:q&hl=:hl&gl=:gl', async (req : Request, res : Response) => {
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

app.listen(PORT, () => {
  console.log('Server running');
})
