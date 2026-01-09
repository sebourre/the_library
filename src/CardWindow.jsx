import './CardWindow.css'

export default function CardWindow({cardWindowRef, displayCardWindow, cardImg, cardTitle, cardType, cardMaker, cardTag, cardDate, cardNote}){
  return(
    <div ref={cardWindowRef} className='card_window'>
      <img src={cardImg}/>
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
        <div className='card_window_header'>
          <h2>{cardTitle}</h2>
          <p>{cardType}</p>
        </div>
        <div className='card_window_footer'>
          <p>Maker: {cardMaker}</p>
          <p>Tag: {cardTag}</p>
          <p>Date of release: {cardDate}</p>
          <p>Note: {cardNote}</p>
          <div className='card_window_bar'>
            <div 
              className='card_window_point' 
              style={{
                left: (100 - cardNote) + '%',
                transform: `translate(-${cardNote}%, -50%)`
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}