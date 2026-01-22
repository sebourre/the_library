import { useState } from 'react';
import './BooksWindow.css';

export default function BooksWindow({booksWindowRef, gamesCount, moviesCount, seriesCount}){
  const [booksAdditional, setBooksAdditional] = useState(false);

  return(
    <div ref={booksWindowRef} className='books_window'>
      <div className='books_list'>
        <p>Games<span>{gamesCount}</span></p>
        <p>Movies<span>{moviesCount}</span></p>
        <p>Series<span>{seriesCount}</span></p>
      </div>
      <span className='books_separator'></span>
      <span className='books_separator'></span>
      <div className='books_settings'>
        <div title='Order'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M11 6h9" />
            <path d="M11 12h9" />
            <path d="M12 18h8" />
            <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
            <path d="M6 10v-6l-2 2" />
          </svg>
          <svg
            style={{display: 'none'}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M11 6h9" />
            <path d="M11 12h9" />
            <path d="M11 18h9" />
            <path d="M4 10v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
            <path d="M4 8h3" />
            <path d="M4 20h1.5a1.5 1.5 0 0 0 0 -3h-1.5h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6z" />
          </svg>
        </div>
        <div>
          <svg
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
            onClick={() => setBooksAdditional(!booksAdditional)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Additional</title>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          </svg>
        </div>
        <div className='books_additional' style={{display: booksAdditional ? 'flex' : 'none'}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <title>Clear localStorage</title>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </div>
      </div>
    </div>
  )
}