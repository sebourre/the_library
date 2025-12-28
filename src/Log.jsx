import './Log.css'

export default function Log({handleSubmit}){
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

  return(
    <>
      <svg
        className='log'
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

      <form onSubmit={handleSubmit} className='log_window' id='log_window'>
        <button type='button' className='log_close'>
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
          <input type="text" name='image' id='image' placeholder='url'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' id='title'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="maker">Maker:</label>
          <input type="text" name='maker' id='maker'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="date_of_release">Date of release:</label>
          <input type="date" name='date_of_release' id='date_of_release'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="tag">Tag:</label>
          <input type="text" name='tag' id='tag'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="note">Note:</label>
          <input type="number" name='note' id='note' min={0} max={100}/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="type">Type:</label>
          <select name='type' id="type">
            <option value="Game">Game</option>
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
          </select>
        </div>
        <button type='submit' className='log_in' onClick={hideLogWindow}>
          Log in
        </button>
      </form>
    </>
  )
}