import { useState, useEffect } from 'react'
import './App.css'

export default function Clock(){
  const [time, setTime] = useState(null);
  function updateTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    setTime(`${hours}:${minutes}:${seconds}`);
  }

  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval)
  }, []);

  return(
    <p className='clock'>{time}</p>
  )
}