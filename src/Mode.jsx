import { useState } from 'react'
import './Mode.css'

export default function Mode(){
  const [mode, setMode] = useState(window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light')

  const root = document.documentElement;
  function lightMode(){
    root.style.setProperty('--primary-color', 'whitesmoke');
    root.style.setProperty('--secondary-color', 'rgb(25, 25, 25)');
    setMode('light');
  }
  function darkMode(){
    root.style.setProperty('--primary-color', 'rgb(25, 25, 25)');
    root.style.setProperty('--secondary-color', 'whitesmoke');
    setMode('dark');
  }

  return(
    <div className='mode'>
      <svg
        id='light'
        style={{
          display: mode=='dark' ? 'block' : 'none'
        }}
        onClick={lightMode}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
      </svg>
      <svg
        id='dark'
        style={{
          display: mode=='light' ? 'block' : 'none'
        }}
        onClick={darkMode}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
    </div>
  )
}