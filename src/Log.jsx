import './Log.css'

export default function Log(){
  function logIn(){
    document.body.style.filter = 'blur(10px)';
    document.body.style.pointerEvents = 'none';
  }

  return(
    <button type='button' className='log'>
      <svg
        onClick={logIn}
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
        <path d="M9 12h6" />
        <path d="M12 9v6" />
        <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
      </svg>
    </button>
  )
}