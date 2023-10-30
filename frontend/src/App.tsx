import { useEffect, useState } from 'react';
import './App.css'
import { Socket, io } from 'socket.io-client'
import News from './components/News/News';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const socket : Socket = io('http://localhost:3000');

type requestNews = {
  q: string,
  hl: string,
  gl: string,
  time: number
}

type news = {
  title: string,
  link: string,
  time: string
}
// q=israel&hl=pt-BR&gl=BR&ceid=BR%3Apt-419

function App() {
  const [data, setData] = useState<requestNews>({
    q: '',
    hl: 'pt-BR',
    gl: 'BR',
    time: 15,
  });
  const [newsData, setNewsData] = useState<news[]>()
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    socket.emit('news', data);
    setData({...data, ...{q:''}});
    setDisableForm(true);

  }

  useEffect(() => {
    socket.on('receive_news', (data : news[]) =>{
      setNewsData(data)
      setLoading(false);
    })
  },[])

  return (
    <>
    <Navbar/>
      <div className='flex flex-col items-center justify-center min-h-[92vh]'>
        {!disableForm && 
          <div>
            <div>
              <h2>Insire o assunto da notícia no campo abaixo e selecione o intervalo que você quer ficar recebendo notícias.</h2>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Assunto da notícia</span>
                  <input type="text" value={data.q} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setData({...data, ...{q : e.target.value}})} />
                </label>
                <select value={data.time} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => setData({...data, ...{time: Number(e.target.value)}})}>
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos</option>
                </select>
                <input type="submit" value='Receber notícias'/>
              </form>
            </div>

          </div>
          
        }
        <div className='w-1/2 space-y-4'>
          {loading && <h2>Carregando...</h2>}
          {!loading && newsData && newsData.map((newsElement) => (
            <News title={newsElement.title} link={newsElement.link} time={newsElement.time}/>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
