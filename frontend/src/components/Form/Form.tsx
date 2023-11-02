import React from 'react'
import { requestNews } from '../../types/typesNews'

type Props = {
  handleSubmit : (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  data : requestNews,
  setData : React.Dispatch<React.SetStateAction<requestNews>>
}

const Form = ({handleSubmit, data, setData}: Props) => {
  return (
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
  )
}

export default Form