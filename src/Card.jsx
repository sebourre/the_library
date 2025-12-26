import './Card.css'

export default function Card({src, title, dev, date, mode, pf, mc}){
  return(
    <div className='card'>
      <img src={src}></img>
      <p className='card_title'>{title}</p>
      <div className='card_info'>
        <p>{dev}</p>
        <p>{date}</p>
        <p>{mode}</p>
        <p>{pf}</p>
      </div>
      <div 
        className='card_mc'
        style={{
          backgroundColor: 
            mc >= 75 ? 'green' : 
            mc >= 40 ? 'orange' : 
            'red'
        }}
      >
        <p>{mc}</p>
      </div>
    </div>
  )
}