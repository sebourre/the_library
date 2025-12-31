import { useState } from 'react'
import './App.css'
import Types from './Types.jsx'
import Bookmarks from './Bookmarks.jsx'
import Log from './Log.jsx'
import Animation from './Animation.jsx'
import Mode from './Mode.jsx'
import Card from './Card.jsx'

function App(){
  const [cards, setCards] = useState([
    {id: 0, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/70/header.jpg?t=1745368462', title: 'Half-Life', maker: 'VALVe', date: '1998-11-19', tag: 'FPS', note: 100, type: 'Game'},
    {id: 1, bookmarked: false, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1808500/04baafaf64a5aa5f46ecda5d71889a4848dc0628/header.jpg?t=1765441443', title: 'Arc Raiders', maker: 'Embark Studios', date: '2025-10-30', tag: 'Extraction Shooter', note: 70, type: 'Game'},
    {id: 2, bookmarked: false, src: 'https://m.media-amazon.com/images/M/MV5BZDY5ODFhZjctZGIxNi00YzBmLThmYzItNDdmZTFmNWUwZWQ1XkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UY281_CR8,0,500,281_.jpg', title: 'Spider-Man: Into the Spider-Verse', maker: 'Bob Persichetti, Peter Ramsey and Rodney Rothman', date: '2018-12-14', tag: 'Animation', note: 100, type: 'Movie'},
    {id: 3, bookmarked: false, src: 'https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQviwRi9D1MAfx6Yl4ApfCUEDDW03_fiZt35ct4l-Zqs1JQ6_OBdlPo5Izt5GIJUAum8A--kta20z1pGYjZrTtEhMuCudgnZYQ-A.jpg?r=ada', title: 'La La Land', maker: 'Damien Chazelle', date: '2016-12-09', tag: 'Musical', note: 0, type: 'Movie'},
    {id: 4, bookmarked: false, src: 'https://media.gqmagazine.fr/photos/6565c827d0161a1a0165d0f6/16:9/w_2560%2Cc_limit/TheBearS01.jpg', title: 'The Bear', maker: 'Christopher Storer', date: '2022-06-23', tag: 'Drama', note: 70, type: 'Series'},
    {id: 5, bookmarked: false, src: 'https://lepauledorion.com/wp-content/uploads/2022/01/arcane.jpeg', title: 'Arcane', maker: 'Fortiche', date: '2021-11-06', tag: 'Animation', note: 0, type: 'Series'}
  ])

  const [gamesOn, setGamesOn] = useState(false);
  const [moviesOn, setMoviesOn] = useState(false);
  const [seriesOn, setSeriesOn] = useState(false);

  const [bookmarksOn, setBookmarksOn] = useState(false);
  const filteredCards = 
    bookmarksOn ? cards.filter(card => card.bookmarked == true) : 
    gamesOn ? cards.filter(card => card.type == 'Game') : 
    moviesOn ? cards.filter(card => card.type == 'Movie') : 
    seriesOn ? cards.filter(card => card.type == 'Series') : 
    cards

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

  const logIn = (e) => {
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

  const onDelete = (cardId) => {
    setCards(curr => curr.filter(card => card.id !== cardId));
  }

  return(
    <>
      <header>
        <h1>The Library</h1>
        <div className='buttons'>
          <Types 
            displayGamesCards={(games) => setGamesOn(games)} 
            displayMoviesCards={(movies) => setMoviesOn(movies)} 
            displaySeriesCards={(series) => setSeriesOn(series)}
          />
          <Bookmarks filterCards={(bookmarks) => setBookmarksOn(bookmarks)}/>
          <Log handleSubmit={logIn}/>
          <Animation changeAnimation={(animation) => setAnimationOn(animation)}/>
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