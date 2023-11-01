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

export type {requestNews, news};