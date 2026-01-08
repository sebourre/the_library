import './App.css'

export default function Infos({cards}){
  return(
    <p className='infos'>{cards.length} logs</p>
  )
}