import './Log.css'

export default function Log(){
  function displayLogWindow(){
    const library = document.getElementById('library');
    const logWindow = document.getElementById('log_window');
    library.style.filter = 'blur(10px)';
    library.style.pointerEvents = 'none';
    logWindow.style.display = 'flex';
  }
  function hideLogWindow(){
    const library = document.getElementById('library');
    const logWindow = document.getElementById('log_window');
    library.style.filter = 'none';
    library.style.pointerEvents = 'auto';
    logWindow.style.display = 'none';
  }
  function logIn(){
    const item = {
      src: document.getElementById('image').value, 
      title: document.getElementById('title').value, 
      dev: document.getElementById('developers').value, 
      date: document.getElementById('date_of_release').value, 
      mode: document.getElementById('mode').value, 
      pf: document.getElementById('platform').value, 
      mc: document.getElementById('metacritic').value
    }
    console.log(item);
    hideLogWindow();
  }

  return(
    <>
      <button type='button' className='log'>
        <svg
          onClick={displayLogWindow}
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

      <div className='log_window' id='log_window'>
        <button className='log_close'>
          <svg
            onClick={hideLogWindow}
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
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <h2>Log</h2>
        <div className='log_inputs'>
          <label htmlFor="image">Image:</label>
          <input type="text" id='image'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="title">Title:</label>
          <input type="text" id='title'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="developers">Developers:</label>
          <input type="text" id='developers'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="date_of_release">Date of release:</label>
          <input type="date" id='date_of_release'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="mode">Mode:</label>
          <select id="mode">
            <option value="solo">Solo</option>
            <option value="multiplayer">Multiplayer</option>
          </select>
        </div>
        <div className='log_inputs'>
          <label htmlFor="platform">Platform:</label>
          <input type="text" id='platform'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="metacritic">Metacritic:</label>
          <input type="number" id='metacritic'/>
        </div>
        <button type='button' className='log_in' onClick={logIn}>
          Log in
        </button>
      </div>
    </>
  )
}