import { useState } from 'react'
import './Types.css'

export default function Types({displayGamesCards, displayMoviesCards, displaySeriesCards}){
  const [games, setGames] = useState(false)
  const [movies, setMovies] = useState(false)
  const [series, setSeries] = useState(false)

  return(
    <div className='types'>
      <button 
        style={{color: games ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {setGames(!games); displayGamesCards(!games)}}
      >
        Games
      </button>
      <button
        style={{color: movies ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {setMovies(!movies); displayMoviesCards(!movies)}}
      >
        Movies
      </button>
      <button
        style={{color: series ? 'var(--red-hue)' : 'var(--secondary-color)'}}
        onClick={() => {setSeries(!series); displaySeriesCards(!series)}}
      >
        Series
      </button>
    </div>
  )
}