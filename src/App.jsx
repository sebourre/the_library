import { useState, useRef, useEffect } from 'react'
import './App.css'
import Books from './Books.jsx'
import SearchBar from './SearchBar.jsx'
import Types from './Types.jsx'
import Bookmarks from './Bookmarks.jsx'
import Log from './Log.jsx'
import LogWindow from './LogWindow.jsx'
import Animation from './Animation.jsx'
import Theme from './Theme.jsx'
import Infos from './Infos.jsx'
import Clock from './Clock.jsx'
import Card from './Card.jsx'
import CardWindow from './CardWindow.jsx'

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
    const bookmarkedCard = cards.map(card => {
      if(card.id == cardId){
        return {...card, bookmarked: !card.bookmarked};
      }else{
        return card;
      }
    })
    setCards(bookmarkedCard);
  }

  const headerRef = useRef(null);
  const libraryRef = useRef(null);
  const logWindowRef = useRef(null);
  const [logWindowOn, setLogWindowOn] = useState(false);
  function displayLogWindow(logWindow){
    headerRef.current.style.filter = logWindow ? 'blur(10px)' : 'none';
    headerRef.current.style.pointerEvents = logWindow ? 'none' : 'auto';
    libraryRef.current.style.filter = logWindow ? 'blur(10px)' : 'none';
    libraryRef.current.style.pointerEvents = logWindow ? 'none' : 'auto';
    logWindowRef.current.style.display = logWindow ? 'flex' : 'none';
  }

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

  const [animationOn, setAnimationOn] = useState(() => {
    const saveAnimation = localStorage.getItem('animation');
    return saveAnimation ? JSON.parse(saveAnimation) : true;
  });
  useEffect(() => {
    localStorage.setItem('animation', JSON.stringify(animationOn))
  }, [animationOn]);

  function editCard(e, id, newSrc, newTitle, newMaker, newDate, newTag, newNote, newType){
    e.preventDefault();
    const newData = [newSrc, newTitle, newMaker, newDate, newTag, newNote, newType];
    const info = ['src', 'title', 'maker', 'date', 'tag', 'note', 'type'];
    const cleanedData = [];
    const editedCard = cards.map(card => {
      if(card.id == id){
        for(let i = 0; i < newData.length; i++){
          let data = newData[i];
          data.trim() == "" ? data = card[info[i]]: null;
          cleanedData.push(data);
        }
        return {...card, src: cleanedData[0], title: cleanedData[1], maker: cleanedData[2], date: cleanedData[3], tag: cleanedData[4], note: cleanedData[5], type: cleanedData[6]};
      }else{
        return card;
      }
    })
    setCards(editedCard);
  }

  function onDelete(cardId){
    setCards(curr => curr.filter(card => card.id !== cardId));
  }

  const cardWindowRef = useRef(null);
  const [cardImg, setCardImg] = useState(null);
  const [cardTitle, setCardTitle] = useState(null);
  const [cardType, setCardType] = useState(null);
  const [cardMaker, setCardMaker] = useState(null);
  const [cardTag, setCardTag] = useState(null);
  const [cardDate, setCardDate] = useState(null);
  const [cardNote, setCardNote] = useState(null);
  function displayCardWindow(boolean, id){
    headerRef.current.style.filter = boolean ? 'blur(10px)' : 'none';
    headerRef.current.style.pointerEvents = boolean ? 'none' : 'auto';
    libraryRef.current.style.filter = boolean ? 'blur(10px)' : 'none';
    libraryRef.current.style.pointerEvents = boolean ? 'none' : 'auto';
    cardWindowRef.current.style.display = boolean ? 'flex' : 'none';
    setCardImg(boolean ? cards[id].src : null);
    if(id != null){
      setCardTitle(cards[id].title);
      setCardType(cards[id].type);
      setCardMaker(cards[id].maker);
      setCardTag(cards[id].tag);
      setCardDate(cards[id].date);
      setCardNote(cards[id].note);
    }
  }

  return(
    <>
      <header ref={headerRef}>
        <Books />
        <h1 onClick={reload}>The Library</h1>
        <div className='settings'>
          <SearchBar searchCards={(searchRef) => searchCards(searchRef)} resetSearchValue={() => setSearchValue('')}/>
          <Types displayTypesCards={(types) => setTypesOn(types)} />
          <Bookmarks filterCards={(bookmarks) => setBookmarksOn(bookmarks)}/>
          <Log setLogWindowOn={(logWindowOn) => setLogWindowOn(logWindowOn)} displayLogWindow={(logWindowOn) => displayLogWindow(logWindowOn)} logWindowOn={logWindowOn}/>
          <Animation changeAnimation={(animation) => setAnimationOn(animation)}/>
          <Theme />
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
            displayCardWindow={(boolean, id) => displayCardWindow(boolean, id)}
            formSubmit={(e, id, newSrc, newTitle, newMaker, newDate, newTag, newNote, newType) => editCard(e, id, newSrc, newTitle, newMaker, newDate, newTag, newNote, newType)}
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
        ) : <span>Empty</span>}
      </div>
      <CardWindow cardWindowRef={cardWindowRef} displayCardWindow={(boolean) => displayCardWindow(boolean)} cardImg={cardImg} cardTitle={cardTitle} cardType={cardType} cardMaker={cardMaker} cardTag={cardTag} cardDate={cardDate} cardNote={cardNote}/>
      <Infos cards={cards}/>
      <Clock />
      <LogWindow formSubmit={logIn} ref={logWindowRef} setLogWindowOn={(logWindowOn) => setLogWindowOn(logWindowOn)} displayLogWindow={(logWindowOn) => displayLogWindow(logWindowOn)} logWindowOn={logWindowOn} logWindowRef={logWindowRef}/>
    </>
  )
}