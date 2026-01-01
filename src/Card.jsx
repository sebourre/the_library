import './Card.css'

export default function Card({styleCard, styleCardOptions, styleCardInfo, styleCardBar, styleCardType, pos, isBookmarked, onDelete, id, bookmarked, src, title, maker, date, tag, note, type}){
  return(
    <div className='card' style={styleCard}>
      <div className='card_head'>
        <p>{pos + 1}</p>
        <div className='card_options' style={styleCardOptions}>
          <svg
            onClick={() => {isBookmarked(id)}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'var(--red-hue)' : 'none'}
            stroke="var(--red-hue)"
          >
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          <svg
            style={{cursor: 'not-allowed'}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
          >
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          <svg
            onClick={() => onDelete(id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
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
      <div className='card_info' style={styleCardInfo}>
        <p><b>{title}</b></p>
        <p>{maker}</p>
        <p>{date}</p>
        <p>{tag}</p>
        <div className='card_bar' style={styleCardBar}></div>
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
      <p className='card_type' style={styleCardType}>{type}</p>
    </div>
  )
}