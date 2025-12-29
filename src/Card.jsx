import { useState } from 'react'
import './Card.css'

export default function Card({styleCard, styleCardOptions, styleCardInfo, styleCardBar, styleCardType, pos, isBookmarked, onDelete, id, src, title, maker, date, tag, note, type}){
  const [bookmark, setBookmark] = useState(false)

  return(
    <div style={styleCard} className='card'>
      <div className='card_head'>
        <p>{pos + 1}</p>
        <div style={styleCardOptions} className='card_options'>
          <svg
            onClick={() => {setBookmark(!bookmark); isBookmarked(id ,!bookmark)}}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={bookmark ? 'var(--red-hue)' : 'none'}
            stroke="var(--red-hue)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          <svg
            style={{cursor: 'not-allowed'}}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          <svg
            onClick={() => onDelete(id)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </div>
        </div>
      <img src={src}/>
      <div style={styleCardInfo} className='card_info'>
        <p><b>{title}</b></p>
        <p>{maker}</p>
        <p>{date}</p>
        <p>{tag}</p>
        <div style={styleCardBar} className='card_bar'></div>
      </div>
      <div 
        className='card_note'
        style={{
          backgroundColor: 
            note >= 75 ? 'green' : 
            note >= 40 ? 'orange' : 
            'red'
        }}
      >
        <p>{note}</p>
      </div>
      <p style={styleCardType} className='card_type'>{type}</p>
    </div>
  )
}