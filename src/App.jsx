import { useState, useRef, useEffect } from 'react'
import './App.css'
import Books from './Books.jsx'
import SearchBar from './SearchBar.jsx'
import Types from './Types.jsx'
import Bookmarks from './Bookmarks.jsx'
import Log from './Log.jsx'
import LogWindow from './LogWindow.jsx'
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

  function reload(){
    location.reload();
  }

  const [searchValue, setSearchValue] = useState('');
  function searchCards(searchRef){
    const value = searchRef.current.value.trim().toLowerCase();
    setSearchValue(value);
  }

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
    if(searchValue){
      c = c.filter(card => card.title.toLowerCase().includes(searchValue));
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

  const logWindowRef = useRef(null);
  const [logWindowOn, setLogWindowOn] = useState(false);
  function displayLogWindow(logWindow){
    libraryRef.current.style.filter = logWindow ? 'blur(10px)' : 'none';
    libraryRef.current.style.pointerEvents = logWindow ? 'none' : 'auto';
    logWindowRef.current.style.display = logWindow ? 'flex' : 'none';
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
        <Books />
        <h1 onClick={reload}>The Library</h1>
        <div className='settings'>
          <SearchBar searchCards={(searchRef) => searchCards(searchRef)} resetSearchValue={() => setSearchValue('')}/>
          <Types displayTypesCards={(types) => setTypesOn(types)} />
          <Bookmarks filterCards={(bookmarks) => setBookmarksOn(bookmarks)}/>
          <Log setLogWindowOn={(logWindowOn) => setLogWindowOn(logWindowOn)} displayLogWindow={(logWindowOn) => displayLogWindow(logWindowOn)} logWindowOn={logWindowOn}/>
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
      <LogWindow formSubmit={logIn} ref={logWindowRef} setLogWindowOn={(logWindowOn) => setLogWindowOn(logWindowOn)} displayLogWindow={(logWindowOn) => displayLogWindow(logWindowOn)} logWindowOn={logWindowOn} logWindowRef={logWindowRef}/>
    </>
  )
}