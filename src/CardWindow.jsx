import './CardWindow.css'

export default function CardWindow({cardWindowRef, displayCardWindow, cardImg, cardTitle, cardType, cardMaker, cardTag, cardDate, cardNote}){
  return(
    <div ref={cardWindowRef} className='card_window' style={{backgroundImage: `url(${cardImg})`}}>
      <div className='card_window_content'>
        <svg
          className='card_window_close'
          onClick={() => displayCardWindow(false, null)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--white-hue)"
        >
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        <h2>{cardTitle}</h2>
        <p>{cardType}</p>
        <p>Maker: {cardMaker}</p>
        <p>Tag: {cardTag}</p>
        <p>Date of release: {cardDate}</p>
        <p>Note: {cardNote}</p>
      </div>
    </div>
  )
}