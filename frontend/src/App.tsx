import { useState } from 'react';
import './App.css'
import News from './components/News/News';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { requestNews } from './types/typesNews';
import useRequestNews from './hooks/useRequestNews';
import { allowNotification } from './utils/notification';
import Form from './components/Form/Form';

function App() {
  const [data, setData] = useState<requestNews>({
    q: '',
    hl: 'pt-BR',
    gl: 'BR',
    time: 15,
  });
  const [disableForm, setDisableForm] = useState<boolean>(false);
  const {loading : loadingNews, newsData: newsDataHook, requestNews : requestNewsHook} = useRequestNews();

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    allowNotification()
    requestNewsHook(data, true);
    setInterval(() => requestNewsHook(data, false), 60000 * data.time);
    setDisableForm(true);

  }

  return (
    <>
      <Navbar/>
      <div className='flex flex-col items-center mt-1 min-h-[92vh]'>
        {disableForm && <h2> Tracking: {data.q}</h2>}
        {!disableForm && 
          <div className='flex flex-col items-center border-2 rounded-md shadow-xl'>
              <div className='m-1'>
                <span>Seja bem-vindo ao News Tracking. Esse site rastreia notícias sobre um assunto que for informado e atualizará você a cada {data.time} minutos.</span>
              </div>
              <h2>Insira o assunto da notícia no campo abaixo e selecione o intervalo que você quer deseja receber as notícias.</h2>
             <Form data={data} setData={setData} handleSubmit={handleSubmit}/>
          </div>          
        }
        {loadingNews && <h2>Carregando...</h2>}
        {disableForm && !loadingNews && 
          <div className='flex flex-col w-1/2 space-y-8'>
          {newsDataHook && newsDataHook.map((newsElement) => (
            <News title={newsElement.title} link={newsElement.link} time={newsElement.time}/>
          ))}
        </div>}
      </div>
      <Footer/>
    </>
  )
}

export default App
