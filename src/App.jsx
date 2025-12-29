import { useState } from 'react'
import './App.css'
import Bookmarks from './Bookmarks.jsx'
import Animation from './Animation.jsx'
import Log from './Log.jsx'
import Mode from './Mode.jsx'
import Card from './Card.jsx'

function App(){
  const [cards, setCards] = useState([
    {id: 0, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/70/header.jpg?t=1745368462', title: 'Half-Life', maker: 'VALVe', date: '1998-11-19', tag: 'FPS', note: 96, type: 'Game'},
    {id: 1, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1745368545', title: 'Half-Life 2', maker: 'VALVe', date: '2004-11-16', tag: 'FPS', note: 96, type: 'Game'},
    {id: 2, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/header.jpg?t=1745368554', title: 'Portal', maker: 'VALVe', date: '2007-10-10', tag: 'FPS', note: 90, type: 'Game'},
    {id: 3, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg?t=1745363004', title: 'Portal 2', maker: 'VALVe', date: '2011-04-19', tag: 'FPS', note: 95, type: 'Game'},
    {id: 4, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861', title: 'Counter-Strike 2', maker: 'VALVe', date: '2023-09-27', tag: 'FPS', note: 82, type: 'Game'}
  ])

  const [animationOn, setAnimationOn] = useState(true);

  const [bookmarksOn, setBookmarksOn] = useState(false);

  const filteredCards = bookmarksOn ? cards.filter(card => card.bookmarked == true) : cards

  const logIn = (e) => {
    e.preventDefault();
    const newCard = {
      id: (cards[cards.length - 1]?.id ?? -1) + 1,
      bookmarked: false, 
      src: e.target.image.value, 
      title: e.target.title.value, 
      maker: e.target.maker.value, 
      date: e.target.date_of_release.value, 
      tag: e.target.tag.value, 
      note: e.target.note.value,
      type: e.target.type.value
    };
    setCards([...cards, newCard]);
    e.target.reset();
  }

  function isBookmarked(cardId, bookmark){
    console.log('Is card ' + cardId + ' bookmarked?', bookmark);
    const bookmarkedCards = cards.map(card => {
      if(card.id == cardId){
        return {...card, bookmarked: !card.bookmarked};
      }else{
        return card;
      }
    })
    setCards(bookmarkedCards);
  }

  const onDelete = (cardId) => {
    setCards(curr => curr.filter(card => card.id !== cardId));
  }

  return(
    <>
      <header>
        <h1>The Library</h1>
        <div className='buttons'>
          <Animation changeAnimation={(animation) => setAnimationOn(animation)}/>
          <Bookmarks filterCards={(bookmarks) => setBookmarksOn(bookmarks)}/>
          <Log handleSubmit={logIn}/>
          <Mode />
        </div>
      </header>
      <div className='library' id='library'>
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
            // bookmarked={card.bookmarked}
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

export default App