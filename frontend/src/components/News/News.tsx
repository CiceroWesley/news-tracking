type Props = {
  title: string,
  link: string,
  time: string
}

const News = ({title, link, time}: Props) => {
  return (
    <div className='flex flex-col border-2 rounded-md shadow-xl text-justify p-2'>
      <a href={`https://news.google.com/${link}`} target='_blank'>
        <h4 className='text-xl'>{title}</h4>
      </a>
      <h6 className='text-sm'>{time}</h6>
    </div>
  )
}

export default News