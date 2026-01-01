import { useState, useRef, useEffect } from 'react'
import './App.css'
import Types from './Types.jsx'
import Bookmarks from './Bookmarks.jsx'
import Log from './Log.jsx'
import Animation from './Animation.jsx'
import Mode from './Mode.jsx'
import Card from './Card.jsx'

export default function App(){
  const [cards, setCards] = useState(() => {
    const saveCards = localStorage.getItem('cards');
    return saveCards ? JSON.parse(saveCards) : [];
  });

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards]);

  const [typesOn, setTypesOn] = useState(null);

  const [bookmarksOn, setBookmarksOn] = useState(false);
  const filteredCards = (() => {
    let c = bookmarksOn ? cards.filter(card => card.bookmarked === true) : cards;
    if(typesOn == 'games'){
      c = c.filter(card => card.type === 'Game');
    }else if(typesOn == 'movies'){
      c = c.filter(card => card.type === 'Movie');
    }else if(typesOn == 'series'){
      c = c.filter(card => card.type === 'Series');
    }
    return c;
  })();

  function isBookmarked(cardId){
    const bookmarkedCards = cards.map(card => {
      if(card.id == cardId){
        return {...card, bookmarked: !card.bookmarked};
      }else{
        return card;
      }
    })
    setCards(bookmarkedCards);
  }

  const libraryRef = useRef(null);
  function logIn(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCard = {
      id: (cards[cards.length - 1]?.id ?? -1) + 1,
      bookmarked: false, 
      src: formData.get('image'), 
      title: formData.get('title'), 
      maker: formData.get('maker'), 
      date: formData.get('date_of_release'), 
      tag: formData.get('tag'), 
      note: formData.get('note'),
      type: formData.get('type')
    };
    setCards([...cards, newCard]);
    e.target.reset();
    e.target.querySelector('img').src = '';
  }

  const [animationOn, setAnimationOn] = useState(true);

  function onDelete(cardId){
    setCards(curr => curr.filter(card => card.id !== cardId));
  }

  return(
    <>
      <header>
        <h1>The Library</h1>
        <div className='buttons'>
          <Types displayTypesCards={(types) => setTypesOn(types)} />
          <Bookmarks filterCards={(bookmarks) => setBookmarksOn(bookmarks)}/>
          <Log libraryRef={libraryRef} formSubmit={logIn}/>
          <Animation changeAnimation={(animation) => setAnimationOn(animation)}/>
          <Mode />
        </div>
      </header>
      <div ref={libraryRef} className='library'>
        {filteredCards.length != 0 ? 
          filteredCards.map((card, index)=> 
          <Card 
            styleCard={!animationOn ? {filter: 'grayscale(0)'} : null}
            styleCardOptions={!animationOn ? {transition: 'none'} : null}
            styleCardInfo={!animationOn ? {backgroundColor: 'var(--secondary-color)'} : null}
            styleCardBar={!animationOn ? {width: '80%'} : null}
            styleCardType={!animationOn ? {color: 'var(--secondary-color)'} : null}
            key={card.id} 
            pos={index}
            isBookmarked={(cardId, bookmark) => isBookmarked(cardId, bookmark)}
            onDelete={(id) => onDelete(id)}
            id={card.id}
            bookmarked={card.bookmarked}
            src={card.src}
            title={card.title}
            maker={card.maker}
            date={card.date}
            tag={card.tag}
            note={card.note}
            type={card.type}
          />
        ) : <h3>Empty</h3>}
      </div>
    </>
  )
}