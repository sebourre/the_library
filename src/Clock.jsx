import { useState, useEffect } from 'react'
import './App.css'

export default function Clock(){
  const [time, setTime] = useState(null);
  function updateTime(){
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10){
      minutes = '0' + minutes;
    }
    let seconds = date.getSeconds();
    if(seconds < 10){
      seconds = '0' + seconds;
    }
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