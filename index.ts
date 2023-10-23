import express, {Express, Request, Response} from 'express';

const app : Express = express();

const PORT = 3000;

app.get('/', (req : Request, res : Response) => {
  res.send('Typescript');
})

app.listen(PORT, () => {
  console.log('Server running')
})