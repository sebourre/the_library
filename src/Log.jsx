import { useState } from 'react'
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

  const [imagePreview, setImagePreview] = useState(null)

  function updateImagePreview(e){
    setImagePreview(e.target.value)
  }

  const [error, setError] = useState(null)
  function isInputValid(e){
    const input = e.target;
    const value = input.value;
    if(value < input.min || value > input.max || isNaN(value) == true){
      setError('Input invalid')
    }else{
      setError(null)
    }
  }

  function reseted(e){
    const svg = e.target;
    const form = e.target.parentNode.parentNode;
    svg.style.animation = '.5s ease rotate';
    svg.style.pointerEvents = 'none';
    form.reset();
    setImagePreview(null)
    setTimeout(() => {
      svg.style.animation = 'none';
      svg.style.pointerEvents = 'auto';
    }, 500);
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
            stroke="var(--white-hue)"
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
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' id='title'/>
        </div>
        <div className='log_row'>
          <div className='log_inputs'>
            <label htmlFor="image">Image:</label>
            <input type="url" name='image' id='image' onChange={updateImagePreview} placeholder='url'/>
          </div>
          <div className='image_preview'>
            <img src={imagePreview}/>
          </div>
        </div>
        <div className='log_inputs'>
          <label htmlFor="maker">Maker:</label>
          <input type="text" name='maker' id='maker'/>
        </div>
        <div className='log_inputs'>
          <label htmlFor="tag">Tag:</label>
          <input type="text" name='tag' id='tag'/>
        </div>
        <div className='log_row'>
          <div className='log_inputs'>
            <label htmlFor="note">Note:</label>
            <input type="number" name='note' id='note' placeholder='0/100' min={0} max={100} onChange={isInputValid}/>
          </div>
          <div className='log_inputs'>
            <label htmlFor="date_of_release">Date of release:</label>
            <input type="date" name='date_of_release' id='date_of_release'/>
          </div>
          <div className='log_inputs'>
            <label htmlFor="type">Type:</label>
            <select name='type' id="type">
              <option value="Game">Game</option>
              <option value="Movie">Movie</option>
              <option value="Series">Series</option>
            </select>
          </div>
        </div>
        <div className='log_footer'>
          <p className='log_error'>{error}</p>
          <div className='log_buttons'>
            <svg
              onClick={reseted}
              className='log_reset'
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--white-hue)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
              <path d="M20 4v5h-5" />
            </svg>
            <button type='submit' className='log_in' onClick={hideLogWindow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--white-hue)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  )
}