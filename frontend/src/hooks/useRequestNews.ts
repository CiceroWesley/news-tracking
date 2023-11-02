import { useState } from "react";
import { news, requestNews } from "../types/typesNews";
import axiosInstance from "../utils/axios";
import { showNotification } from "../utils/notification";


const useRequestNews = () => {
  const [newsData, setNewsData] = useState<news[]>()
  const [loading, setLoading] = useState<boolean>(false);

  const requestNews = async (data : requestNews, firstRequest : boolean) => {
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
      if(!firstRequest){
        showNotification('News Tracking', 'Uma nova busca por notícias foi realizada.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {loading, newsData, requestNews}

}

export default useRequestNews