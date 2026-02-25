import { useState } from 'react'
import './App.css'

export default function Sort({changeSort}){
  const [sort, setSort] = useState(() => {
    const saveSort = localStorage.getItem('sort');
    return saveSort ? JSON.parse(saveSort) : 'digits';
  });

  return(
    <div className='sort' title='Sort'>
      <svg
        style={{display: sort == 'digits' ? 'block' : 'none'}}
        onClick={() => {
          setSort('alphabet'); 
          changeSort('alphabet');
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M11 6h9" />
        <path d="M11 12h9" />
        <path d="M12 18h8" />
        <path d="M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4" />
        <path d="M6 10v-6l-2 2" />
      </svg>
      <svg
        style={{display: sort == 'alphabet' ? 'block' : 'none'}}
        onClick={() => {
          setSort('digits');
          changeSort('digits');
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M11 6h9" />
        <path d="M11 12h9" />
        <path d="M11 18h9" />
        <path d="M4 10v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
        <path d="M4 8h3" />
        <path d="M4 20h1.5a1.5 1.5 0 0 0 0 -3h-1.5h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6z" />
      </svg>
    </div>
  )
}