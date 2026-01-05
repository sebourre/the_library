import './App.css'

export default function Log({setLogWindowOn, displayLogWindow, logWindowOn}){
  return(
    <div className='log' title='Log'>
      <svg
        onClick={() => {
          setLogWindowOn(!logWindowOn);
          displayLogWindow(!logWindowOn);
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--secondary-color)"
      >
        <path d="M9 12h6" />
        <path d="M12 9v6" />
        <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
      </svg>
    </div>
  )
}