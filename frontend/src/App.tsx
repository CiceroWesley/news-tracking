import { useEffect, useState } from 'react';
import './App.css'
import { Socket, io } from 'socket.io-client'

type requestNews = {
  q: string,
  hl: string,
  gl: string
}

type news = {
  title: string,
  link: string
}
// q=israel&hl=pt-BR&gl=BR&ceid=BR%3Apt-419

function App() {
  const socket : Socket = io('http://localhost:3000');
  const [data, setData] = useState<requestNews>({
    q: '',
    hl: 'pt-BR',
    gl: 'BR'
  });
  const [message, setMessage] = useState<news[]>()

  const sendMessage = () => {
    socket.emit('news', data)

  }

  useEffect(() => {
    socket.on('receive_news', (data : news[]) =>{
      // console.log(data)
      setMessage(data)

    })
  }, [socket])

  return (
    <>
      <div>
        <input type="text" value={data.q} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setData({...data, ...{q : e.target.value}})} />
        <button onClick={() => sendMessage()}>Enviar</button>
        {message && message.map((ele) => (
          <div>
            <h4>{ele.title}</h4>
            <h5>{ele.link}</h5>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
