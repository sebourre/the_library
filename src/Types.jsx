import { useState } from 'react'
import './App.css'

export default function Types({displayTypesCards}){
  const [types, setTypes] = useState(null)

  return(
    <div className='types'>
      <button 
        className={types == 'games' ? 'active' : null}
        style={{color: types == 'games' ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {
          const newTypes = (types == null || types != 'games') ? 'games' : null;
          setTypes(newTypes);
          displayTypesCards(newTypes);
        }}
      >
        Games
      </button>
      <button
        className={types == 'movies' ? 'active' : null}
        style={{color: types == 'movies' ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {
          const newTypes = (types == null || types != 'movies') ? 'movies' : null;
          setTypes(newTypes);
          displayTypesCards(newTypes);
        }}
      >
        Movies
      </button>
      <button
        className={types == 'series' ? 'active' : null}
        style={{color: types == 'series' ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {
          const newTypes = (types == null || types != 'series') ? 'series' : null;
          setTypes(newTypes);
          displayTypesCards(newTypes);
        }}
      >
        Series
      </button>
    </div>
  )
}