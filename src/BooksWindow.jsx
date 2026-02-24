import { useState, useEffect } from 'react';
import './BooksWindow.css';

export default function BooksWindow({booksWindowRef, gamesCount, moviesCount, seriesCount, dates, ratings}){
  const [booksPlus, setBooksPlus] = useState(null);

  const [accentColor, setAccentColor] = useState(() => {
    const saveAccentColor = localStorage.getItem('accentColor');
    return saveAccentColor ? JSON.parse(saveAccentColor) : 'red';
  });
  useEffect(() => {localStorage.setItem('accentColor', JSON.stringify(accentColor))}, [accentColor]);
  accentColor == 'mode' ? document.documentElement.style.setProperty('--accent-color', 'var(--secondary-color)') : document.documentElement.style.setProperty('--accent-color', `var(--${accentColor}-hue)`);

  function typePercentage(typeCount){
    if(typeCount == 0) return '0%';
    const total = gamesCount + moviesCount + seriesCount;
    return Math.round((typeCount / total) * 100) + '%';
  }

  return(
    <div ref={booksWindowRef} className='books_window'>
      <div className='books_list'>
        <h4>Count</h4>
        <p>Games<span>{typePercentage(gamesCount) + ' | ' + gamesCount}</span></p>
        <p>Movies<span>{typePercentage(moviesCount) + ' | ' + moviesCount}</span></p>
        <p>Series<span>{typePercentage(seriesCount) + ' | ' + seriesCount}</span></p>
      </div>
      <span className='books_separator'></span>
      <div className='books_list'>
        <h4>Date</h4>
        <p>Newest<span>{dates.length > 0 ? new Date(Math.max(...dates.map(date => new Date(date)))).toLocaleDateString() : '/'}</span></p>
        <p>Oldest<span>{dates.length > 0 ? new Date(Math.min(...dates.map(date => new Date(date)))).toLocaleDateString() : '/'}</span></p>
      </div>
      <span className='books_separator'></span>
      <div className='books_list'>
        <h4>Rating</h4>
        <p>Highest<span>{ratings.length > 0 ? Math.max(...ratings.map(Number)) : '/'}</span></p>
        <p>Lowest<span>{ratings.length > 0 ? Math.min(...ratings.map(Number)) : '/'}</span></p>
        <p>Average<span>{ratings.length > 0 ? Math.round(ratings.reduce((sum, rating) => sum + parseInt(rating), 0)/ratings.length) : '/'}</span></p>
      </div>
      <span className='books_separator'></span>
      <div className='books_settings'>
        <div>
          <svg
            style={{stroke: booksPlus == 'adjustments' ? 'var(--accent-color)' : 'var(--white-hue)'}}
            onClick={() => booksPlus == null || booksPlus == 'additional' ? setBooksPlus('adjustments') : setBooksPlus(null)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Adjustments</title>
            <path d="M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M6 4v4" />
            <path d="M6 12v8" />
            <path d="M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M12 4v10" />
            <path d="M12 18v2" />
            <path d="M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M18 4v1" />
            <path d="M18 9v11" />
          </svg>
          <svg
            style={{stroke: booksPlus == 'additional' ? 'var(--accent-color)' : 'var(--white-hue)'}}
            onClick={() => booksPlus == null || booksPlus == 'adjustments' ? setBooksPlus('additional') : setBooksPlus(null)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Additional</title>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          </svg>
        </div>
        <div className='books_adjustments' style={{display: booksPlus == 'adjustments' ? 'flex' : 'none'}}>
          <div id="mode" title='Mode' className={accentColor == 'mode' ? 'selected' : null} style={{backgroundImage: 'linear-gradient(110deg, var(--white-hue) 50%, var(--black-hue) 50%)'}} onClick={() => {setAccentColor('mode'); document.documentElement.style.setProperty('--accent-color', 'var(--secondary-color)');}}></div>
          <div id="violet" title='Violet' className={accentColor == 'violet' ? 'selected' : null} style={{backgroundColor: 'var(--violet-hue)'}} onClick={() => {setAccentColor('violet'); document.documentElement.style.setProperty('--accent-color', 'var(--violet-hue)');}}></div>
          <div id="blue" title='Blue' className={accentColor == 'blue' ? 'selected' : null} style={{backgroundColor: 'var(--blue-hue)'}} onClick={() => {setAccentColor('blue'); document.documentElement.style.setProperty('--accent-color', 'var(--blue-hue)');}}></div>
          <div id="green" title='Green' className={accentColor == 'green' ? 'selected' : null} style={{backgroundColor: 'var(--green-hue)'}} onClick={() => {setAccentColor('green'); document.documentElement.style.setProperty('--accent-color', 'var(--green-hue)');}}></div>
          <div id="yellow" title='Yellow' className={accentColor == 'yellow' ? 'selected' : null} style={{backgroundColor: 'var(--yellow-hue)'}} onClick={() => {setAccentColor('yellow'); document.documentElement.style.setProperty('--accent-color', 'var(--yellow-hue)');}}></div>
          <div id="orange" title='Orange' className={accentColor == 'orange' ? 'selected' : null} style={{backgroundColor: 'var(--orange-hue)'}} onClick={() => {setAccentColor('orange'); document.documentElement.style.setProperty('--accent-color', 'var(--orange-hue)');}}></div>
          <div id="red" title='Red' className={accentColor == 'red' ? 'selected' : null} style={{backgroundColor: 'var(--red-hue)'}} onClick={() => {setAccentColor('red'); document.documentElement.style.setProperty('--accent-color', 'var(--red-hue)');}}></div>
        </div>
        <div className='books_additional' style={{display: booksPlus == 'additional' ? 'flex' : 'none'}}>
          <svg 
            onClick={() => console.log('Deleting all books...')}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <title>Delete all books</title>
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
            <path d="M9 10h6"/>
          </svg>
          <svg
            onClick={() => localStorage.clear()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Clear localStorage</title>
            <path d="M20.926 13.15a9 9 0 1 0 -7.835 7.784" />
            <path d="M12 7v5l2 2" />
            <path d="M22 22l-5 -5" />
            <path d="M17 22l5 -5" />
          </svg>
        </div>
      </div>
    </div>
  )
}