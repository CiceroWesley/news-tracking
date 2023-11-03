import 'dotenv/config'

import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import News from './utils/news';
import router from './api/api';

const PORT = process.env.PORT || 8080;
const app : Express = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);


app.listen(PORT, () => {
  console.log('Server running');
})
