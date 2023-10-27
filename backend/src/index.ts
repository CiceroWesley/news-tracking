import express, {Express, Request, Response} from 'express';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import cors from 'cors';
import * as cheerio from 'cheerio';
import axiosInstance from './utils/axios';
import { requestNews, news } from './types/types';
import News from './utils/news';

const PORT = 3000;
const app : Express = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());

// create socket server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
});

io.on('connection', async (socket : Socket) => {

  socket.on('news', async (data : requestNews) => {
    const {q, hl, gl} = data;


    setInterval(async () => {
      // get news from web
    const newsData = await News.requestNews({q, hl, gl});
    
    // select data of articles
    const $articles = News.selectArticles(newsData);
    const articles = News.mountStructureNews($articles);
    
    socket.emit('receive_news', articles);
    }, 1000000);

  })

})

// post route with some result of socket
// should be get route with params in url
app.post('/test', async (req : Request, res : Response) => {
    const {q, hl, gl} = req.body;
    
    // get news from web
    const newsData = await News.requestNews({q, hl, gl});
    
    // select data of articles
    const $articles = News.selectArticles(newsData);
    const articles = News.mountStructureNews($articles);

    res.status(200).json(articles)
})

httpServer.listen(PORT, () => {
  console.log('Server running');
})
