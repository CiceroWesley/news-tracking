import express, {Express, Request, Response} from 'express';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import cors from 'cors';


import * as cheerio from 'cheerio';

import axiosInstance from './utils/axios';

const PORT = 3000;
const app : Express = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());


type requestNews = {
  q: string,
  hl: string,
  gl: string
};

type news = {
  title: string,
  link: string,
  time: string
}

// create socket server
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
});

io.on('connection', async (socket : Socket) => {
  // console.log(socket);

  socket.on('news', async (data : requestNews) => {
    const {q, hl, gl} = data
    console.log(q,hl,gl)
    const news = await axiosInstance.get(`https://news.google.com/search?q=${q}&hl=${hl}&gl=${gl}&ceid=BR%3Apt-419`);
    
    const $ = cheerio.load(news.data);
    
    const $articles = $('.DY5T1d.RZIKme');
    let articles : news[] = [];
    
    $articles.each((index, article) => {
      const element : news = {
        title : ((article.children[0] as unknown) as Text).data,
        link : article.attribs.href,
        time : ((((article.parent?.next as unknown) as Element).children[0].children[1].children[0] as unknown) as Text).data
      }
      articles.push(element);
    })    
    socket.emit('receive_news', articles)
    // console.log(articles)
  })

})

app.post('/test', async (req, res) => {
    const {q, hl, gl} = req.body;
    
    const news = await axiosInstance.get(`https://news.google.com/search?q=${q}&hl=${hl}&gl=${gl}&ceid=BR%3Apt-419`);
    
    const $ = cheerio.load(news.data);
    
    const $articles = $('.DY5T1d.RZIKme');
    let articles : news[] = [];
    console.log((((($articles[0].parent?.next as unknown) as Element).children[0].children[1].children[0] as unknown) as Text).data)
    
    $articles.each((index, article) => {
      const element : news = {
        title : ((article.children[0] as unknown) as Text).data,
        link : article.attribs.href,
        time : ((((article.parent?.next as unknown) as Element).children[0].children[1].children[0] as unknown) as Text).data
      }
      articles.push(element);
    })
    
    res.status(200).json(articles)
})

httpServer.listen(PORT, () => {
  console.log('Server running');
})
