import { useEffect, useState } from 'react';
import './App.css'
import { Socket, io } from 'socket.io-client'

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
  const [message, setMessage] = useState<news[]>()
  const [disableForm, setDisableForm] = useState<boolean>(false);

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('news', data);
    setData({...data, ...{q:''}});
    setDisableForm(true);

  }

  useEffect(() => {
    socket.on('receive_news', (data : news[]) =>{
      setMessage(data)
    })
  },[])

  return (
    <>
      <div>
        {!disableForm && 
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
        }
        {message && message.map((ele) => (
          <div>
            <h4>{ele.title}</h4>
            <a href={`https://news.google.com/${ele.link}`} target='_blank'>Link</a>
            <h6>{ele.time}</h6>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
