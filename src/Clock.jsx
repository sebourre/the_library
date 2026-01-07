import './App.css'

export default function Clock(){
  const date = Date();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  // const time = `${hours}:${minutes}:${seconds}`

  return(
    <p className='clock'>{date}</p>
  )
}