import { useState } from 'react';
import './App.css'
import News from './components/News/News';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import axiosInstance from './utils/axios';
import soundMessage from './assets/notificationSound.mp3'
import { requestNews, news } from './types/typesNews';

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
  const [firstNotification, setFirstNotification] = useState<boolean>(true);

  const showNotification = () => {
    const notification = new Notification('News Tracking', {body:'Uma nova busca por notícias foi realizada.', dir:'ltr'});
    const notificationSound = new Audio(soundMessage);
    notificationSound.play();
    notification.addEventListener('click', () => {
      focus();
      notification.close();
    })
  }

  const requestNotification = async () : Promise<void> => {
    if(Notification.permission !== 'granted'){
      const requestPermission : NotificationPermission = await Notification.requestPermission();
      if(requestPermission === 'granted'){
        showNotification();
      }
    } else {
      showNotification();
    }
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestNews = async () => {
      try {
        setLoading(true);
        const newsDataAxios = await axiosInstance.get(`/news/${data.q}&hl=${data.hl}&gl=${data.gl}`);
        if(!newsDataAxios.data.error){
          setNewsData(newsDataAxios.data)
          setLoading(false);
        } else {
          console.log(newsDataAxios.data.error)
          setLoading(false);
        }
        if(!firstNotification){
          requestNotification();
        }
        setFirstNotification(false);
      } catch (error) {
        console.log(error)
      }
    }
    requestNews();
    setInterval(requestNews, 60000 * data.time);
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
              <form onSubmit={handleSubmit} className='flex flex-col items-center w-2/5 space-y-2 mb-2'>
                <input required type="text" className='border rounded-md w-full' placeholder='Insira o assunto da notícia' value={data.q} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setData({...data, ...{q : e.target.value}})} />
                <select value={data.time} className='w-full rounded-md' onChange={(e : React.ChangeEvent<HTMLSelectElement>) => setData({...data, ...{time: Number(e.target.value)}})}>
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos</option>
                </select>
                <input type="submit" className='border rounded-md w-full bg-teal-500 hover:cursor-pointer' value='Receber notícias'/>
              </form>
            </div>          
        }
        {loading && <h2>Carregando...</h2>}
        {disableForm && !loading && 
          <div className='flex flex-col w-1/2 space-y-8'>
          {newsData && newsData.map((newsElement) => (
            <News title={newsElement.title} link={newsElement.link} time={newsElement.time}/>
          ))}
        </div>}
        
      </div>
      <Footer/>
    </>
  )
}

export default App
