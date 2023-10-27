type requestNews = {
    q: string,
    hl: string,
    gl: string
  };
  
  type news = {
    title: string,
    link: string,
    time: string
  };

export {requestNews, news}