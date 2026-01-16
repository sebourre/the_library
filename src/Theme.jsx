import { useState, useEffect, useRef } from 'react'
import './App.css'

export default function Theme(){
  const [theme, setTheme] = useState(() => {
    const saveTheme = localStorage.getItem('theme');
    return saveTheme ? JSON.parse(saveTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme == 'light' ? 'whitesmoke' : 'rgb(25, 25, 25)');
    root.style.setProperty('--secondary-color', theme == 'light' ? 'rgb(25, 25, 25)' : 'whitesmoke');
    lightRef.current.style.display = theme == 'dark' ? 'block' : 'none';
    darkRef.current.style.display = theme == 'light' ? 'block' : 'none';
  }, [theme]);
  
  function changeTheme(){
    setTheme(theme == 'dark' ? 'light' : 'dark');
  }

  const lightRef = useRef(null);
  const darkRef = useRef(null);

  return(
    <div className='theme' title='Theme'>
      <svg
        ref={lightRef}
        onClick={changeTheme}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
      </svg>
      <svg
        ref={darkRef}
        onClick={changeTheme}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      </svg>
    </div>
  )
}