import { useState } from 'react'
import './App.css'

export default function Bookmarks({filterCards}){
  const [bookmarks, setBookmarks] = useState(false);

  return(
    <div className='bookmarks' title='Bookmarks'>
      <svg
        style={{display: bookmarks == false ? 'block' : 'none'}}
        onClick={() => {
          setBookmarks(true); 
          filterCards(!bookmarks);
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M11 7h2a2 2 0 0 1 2 2v2m0 4v6l-5 -3l-5 3v-12a2 2 0 0 1 2 -2" />
        <path d="M9.265 4a2 2 0 0 1 1.735 -1h6a2 2 0 0 1 2 2v10" />
        <path d="M3 3l18 18" />
      </svg>
      <svg
        style={{display: bookmarks == true ? 'block' : 'none'}}
        onClick={() => {
          setBookmarks(false); 
          filterCards(!bookmarks);
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--red-hue)"
      >
        <path d="M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z" />
        <path d="M11 3h5a3 3 0 0 1 3 3v11" />
      </svg>
    </div>
  )
}