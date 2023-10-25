import express, {Express, Request, Response} from 'express';
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import cors from 'cors';


import * as cheerio from 'cheerio';

import axiosInstance from './utils/axios';

const PORT = 3000;
const app : Express = express();
const httpServer = createServer(app);

app.use(cors());

type requestNews = {
  q: string,
  hl: string,
  gl: string
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
    console.log(data);
    const news = await axiosInstance.get(`https://news.google.com/search?q=israel&hl=pt-BR&gl=BR&ceid=BR%3Apt-419`);
    
    const $ = cheerio.load(news.data);
    
    const $articles = $('.DY5T1d.RZIKme')
    
    // fs.writeFile('/home/wesley/site.html', String($articles.children('h3')), (err) => {
    //   if(err){
    //     console.log(err)
    //   }
    // })
    // console.log(($articles[0].children[0] as any).data)
    
    // $articles.each((index, el) => {
    //   // let link = $(el).children('a')
    //   // let title = $(el).children('h3').text()
    //   console.log(el.parent)
    //   // console.log(title)
    // })
  })

})

app.get('/test', async (req, res) => {
    const news = await axiosInstance.get(`https://news.google.com/search?q=israel&hl=pt-BR&gl=BR&ceid=BR%3Apt-419`);
    
    const $ = cheerio.load(news.data);
    
    const $articles = $('.DY5T1d.RZIKme')
    // const articlesSlice = $articles
    // console.log($articles[0].attribs.href)
    // console.log((($articles[0].children[0] as unknown) as Text).data)
    $articles.each((index, article) => {
      console.log(index)
      console.log(article.attribs.href)
      console.log(((article.children[0] as unknown) as Text).data)
    })
    res.status(200)
})

httpServer.listen(PORT, () => {
  console.log('Server running');
})
