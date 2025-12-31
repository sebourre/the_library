import { useState } from 'react'
import './Types.css'

export default function Types({displayTypesCards}){
  const [types, setTypes] = useState(null)

  return(
    <div className='types'>
      <button 
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