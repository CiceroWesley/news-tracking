import { useState } from 'react';
import './App.css'
import { Socket, io } from 'socket.io-client'

type requestNews = {
  q: string,
  hl: string,
  gl: string
}
// q=israel&hl=pt-BR&gl=BR&ceid=BR%3Apt-419

function App() {
  const socket : Socket = io('http://localhost:3000');
  const [data, setData] = useState<requestNews>({
    q: '',
    hl: 'pt-BR',
    gl: 'BR'
  });

  const sendMessage = () => {
    socket.emit('news', data)

  }

  return (
    <>
      <div>
        <input type="text" value={data.q} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setData({...data, ...{q : e.target.value}})} />
        <button onClick={() => sendMessage()}>Enviar</button>
      </div>
    </>
  )
}

export default App
