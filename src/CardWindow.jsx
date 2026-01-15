import './CardWindow.css'

export default function CardWindow({cardWindowRef, displayCardWindow, cardImg, cardTitle, cardType, cardMaker, cardTag, cardDate, cardNote}){
  function trueDate(date){
    const year = date.slice(0, 4);
    let month = date.slice(5, 7);
    if(month == '01'){month = 'January'}
    else if(month == '02'){month = 'February'}
    else if(month == '03'){month = 'March'}
    else if(month == '04'){month = 'April'}
    else if(month == '05'){month = 'May'}
    else if(month == '06'){month = 'June'}
    else if(month == '07'){month = 'July'}
    else if(month == '08'){month = 'August'}
    else if(month == '09'){month = 'September'}
    else if(month == '10'){month = 'October'}
    else if(month == '11'){month = 'November'}
    else if(month == '12'){month = 'December'}
    const day = date.slice(8, 10);
    return `${day} ${month} ${year}`;
  }
  
  return(
    <div ref={cardWindowRef} className='card_window'>
      <img src={cardImg}/>
      <div className='card_window_content'>
        <div className='card_window_ribbon'></div>
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
        </div>
        <div className='card_window_separator'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)" style={{display: cardType == 'Game' ? 'block' : 'none'}}>
              <line x1="6" x2="10" y1="11" y2="11"/>
              <line x1="8" x2="8" y1="9" y2="13"/>
              <line x1="15" x2="15.01" y1="12" y2="12"/>
              <line x1="18" x2="18.01" y1="10" y2="10"/>
              <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)" style={{display: cardType == 'Movie' ? 'block' : 'none'}}>
              <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"/>
              <path d="m6.2 5.3 3.1 3.9"/>
              <path d="m12.4 3.4 3.1 4"/>
              <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)" style={{display: cardType == 'Series' ? 'block' : 'none'}}>
              <path d="m17 2-5 5-5-5"/>
              <rect width="20" height="15" x="2" y="7" rx="2"/>
            </svg>
            {cardType}
          </div>
        </div>
        <div className='card_window_footer'>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)" >
              <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/>
              <path d="m18 15 4-4"/>
              <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>
            </svg>
            <b>Maker:</b> {cardMaker}
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
              <circle cx="7.5" cy="7.5" r=".5" fill="var(--white-hue)"/>
            </svg>
            <b>Tag:</b> {cardTag}
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M8 2v4"/>
              <path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            <b>Date of release:</b> {cardDate ? trueDate(cardDate) : '-'}
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
            </svg>
            <b>Note:</b> {cardNote}
          </p>
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