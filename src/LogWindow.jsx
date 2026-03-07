import { useState, useRef } from 'react'
import './LogWindow.css'

export default function LogWindow({setLogWindowOn, displayLogWindow, logWindowOn, formSubmit, logWindowRef}){
  const [imagePreview, setImagePreview] = useState(null)
  function updateImagePreview(e){setImagePreview(e.target.value)}

  const [error, setError] = useState(null)
  function formValidation(e){
    const inputs = logWindowRef.current.querySelectorAll('input');
    let empty = false;
    inputs.forEach(input => {
      if(!input.value){empty = true;}
    });
    if(empty){
      setError('Input(s) empty.');
      e.preventDefault();
      return;
    }
    setError(null);
    setLogWindowOn(false);
    displayLogWindow(false);
    formSubmit(e);
  }

  const resetRef = useRef(null);
  function formReset(){
    resetRef.current.style.animation = '.5s ease rotate';
    resetRef.current.style.pointerEvents = 'none';
    logWindowRef.current.reset();
    setImagePreview(null);
    setError(null);
    setTimeout(() => {
      resetRef.current.style.animation = 'none';
      resetRef.current.style.pointerEvents = 'auto';
    }, 500);
  }

  return(
    <form
      ref={logWindowRef}
      className='log_window'
      style={{ display: logWindowOn ? 'flex' : 'none' }}
      onSubmit={formValidation}
    >
      <svg
        className='log_close'
        onClick={() => {
          setLogWindowOn(!logWindowOn);
          displayLogWindow(!logWindowOn);
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--white-hue)"
      >
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
      <h3>Log</h3>
      <fieldset className='log_inputs'>
        <legend>Title</legend>
        <input type="text" name='title' placeholder='Title'/>
      </fieldset>
      <div className='log_row'>
        <fieldset className='log_inputs'>
          <legend>Image</legend>
          <input type="url" name='image' onChange={updateImagePreview} placeholder='URL' />
        </fieldset>
        <div className='image_preview'>
          <img src={imagePreview} />
        </div>
      </div>
      <fieldset className='log_inputs'>
        <legend>Maker</legend>
        <input type="text" name='maker' placeholder='Maker'/>
      </fieldset>
      <fieldset className='log_inputs'>
        <legend>Tag</legend>
        <input type="text" name='tag' placeholder='Tag'/>
      </fieldset>
      <div className='log_row'>
        <fieldset className='log_inputs'>
          <legend>Rating</legend>
          <input type="number" name='rating' placeholder='0/100' min={0} max={100} />
        </fieldset>
        <fieldset className='log_inputs'>
          <legend>Date of release</legend>
          <input type="date" name='date_of_release'/>
        </fieldset>
        <fieldset className='log_inputs'>
          <legend>Type</legend>
          <select name='type'>
            <option value="Game">Game</option>
            <option value="Movie">Movie</option>
            <option value="Series">Series</option>
          </select>
        </fieldset>
      </div>
      <div className='log_footer'>
        <p className='log_error'>{error}</p>
        <div className='log_buttons'>
          <svg
            ref={resetRef}
            onClick={formReset}
            className='log_reset'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--white-hue)"
          >
            <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
            <path d="M20 4v5h-5" />
          </svg>
          <button type='submit' className='log_in'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--white-hue)"
            >
              <path d="M5 12l5 5l10 -10" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  )
}