import { useState } from 'react';
import './CardWindow.css'

export default function CardWindow({cardWindowRef, displayCardWindow, cardBookmarked, cardImg, cardTitle, cardType, cardMaker, cardTag, cardDate, cardRating, cardLog}){
  function shorten(text, n){
    if(!text){return}
    else if(text.length > n && !maximize){return text.slice(0, n) + '...'}
    else{return text;}
  }
  
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

  const [maximize, setMaximize] = useState(false);
  const [view, setView] = useState(false);
  
  return(
    <div ref={cardWindowRef} className={maximize ? 'card_window card_window_maximized' : 'card_window'}>
      <img src={cardImg}/>
      <div className={maximize ? 'card_window_content card_window_content_maximized' : 'card_window_content'}>
        <div className={maximize ? 'card_window_ribbon card_window_ribbon_maximized' : 'card_window_ribbon'} style={{display: cardBookmarked ? 'block' : 'none'}}></div>
        <div className='card_window_buttons'>
          <svg
            className='card_window_maximize'
            style={{display: maximize ? 'none' : 'block'}}
            onClick={() => setMaximize(true)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--white-hue)"
          >
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
          </svg>
          <svg
            className='card_window_minimize'
            style={{display: maximize ? 'block' : 'none'}}
            onClick={() => setMaximize(false)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--white-hue)"
          >
            <path d="M15 19v-2a2 2 0 0 1 2 -2h2" />
            <path d="M15 5v2a2 2 0 0 0 2 2h2" />
            <path d="M5 15h2a2 2 0 0 1 2 2v2" />
            <path d="M5 9h2a2 2 0 0 0 2 -2v-2" />
          </svg>
          <svg
            className='card_window_close'
            onClick={() => {
              displayCardWindow(false, null);
              setMaximize(false);
              setView(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--white-hue)"
          >
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </div>
        <div className='card_window_header'>
          <h2 title={cardTitle}>{shorten(cardTitle, 25)}</h2>
        </div>
        <div className='card_window_separator'>
          <div className='card_window_type' style={maximize ? {paddingRight: '10px'} : null}>
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
            {maximize ? cardType : null}
          </div>
        </div>
        <div className='card_window_info'>
          <p title={cardMaker}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)" >
              <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"/>
              <path d="m18 15 4-4"/>
              <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>
            </svg>
            <b>{maximize ? 'Maker:' : null}</b> {shorten(cardMaker, 20)}
          </p>
          <p title={cardTag}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
              <circle cx="7.5" cy="7.5" r=".5" fill="var(--white-hue)"/>
            </svg>
            <b>{maximize ? 'Tag:' : null}</b> {shorten(cardTag, 20)}
          </p>
          <p title={cardDate}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M8 2v4"/>
              <path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            <b>{maximize ? 'Date of release:' : null}</b> {cardDate ? trueDate(cardDate) : '-'}
          </p>
        </div>
        <div className='card_window_footer'>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--white-hue)">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
            </svg>
            <b>{maximize ? 'Rating:' : null}</b> {maximize ? null : cardRating}
          </p>
          <div className={maximize ? 'card_window_bar card_window_bar_maximized' : 'card_window_bar'}>
            <div 
              className={maximize ? 'card_window_point card_window_point_maximized' : 'card_window_point'}
              style={maximize ? {
                left: (100 - (cardRating == 100 ? 90.5 : cardRating > 93 ? 93.5 : cardRating < 5 ? 4.5 : cardRating)) + '%',
                transform: `translate(-${cardRating}%, -50%)`
              } : {
                left: (100 - cardRating) + '%',
                transform: `translate(-${cardRating}%, -50%)`
              }}
            >
              {maximize ? cardRating : null}
            </div>
          </div>
        </div>
        <div className='card_window_log'>Logged on {cardLog}</div>
        <svg 
          className='card_window_view'
          style={{display: maximize && !view ? 'block' : 'none'}}
          onClick={() => setView(!view)}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none"
          stroke="rgba(245, 245, 245, 0.7)"
        >
          <path d="M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"/>
          <path d="M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
          <path d="m6 21 5-5"/>
          <circle cx="9" cy="9" r="2"/>
        </svg>
        <a href={cardImg} target='_blank'><img src={cardImg} className='card_window_view_img' style={{display: view && maximize ? 'block' : 'none'}}/></a>
        <a href={`https://www.google.com/search?q=${cardTitle}`} target='_blank'>
          <svg
            className='card_window_search'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(245, 245, 245, 0.7)"
          >
            <path d="M21 12a9 9 0 1 0 -9 9" />
            <path d="M3.6 9h16.8" />
            <path d="M3.6 15h7.9" />
            <path d="M11.5 3a17 17 0 0 0 0 18" />
            <path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M20.2 20.2l1.8 1.8" />
          </svg>
        </a>
      </div>
    </div>
  )
}