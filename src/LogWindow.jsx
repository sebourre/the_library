import { useState, useRef, useEffect } from 'react'
import './LogWindow.css'

export default function LogWindow({setLogWindowOn, displayLogWindow, logWindowOn, formSubmit, logWindowRef}){
  const inputImageRef = useRef(null);
  const importRef = useRef(null);
  function fileFocus(){importRef.current.click()}
  
  const [imagePreview, setImagePreview] = useState(null)
  function updateImagePreview(e){
    if(e.target.type == 'file' && e.target.files[0]){
      const url = URL.createObjectURL(e.target.files[0])
      setImagePreview(url);
      inputImageRef.current.value = url;
      return;
    }
    setImagePreview(e.target.value);
  }

  function clearInputImage(){
    inputImageRef.current.value = null;
    setImagePreview(null);
  }

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

  const placeholders = [
    {title: 'Counter-Strike', maker: 'VALVe', tag: 'FPS'},
    {title: 'League of Legends', maker: 'Riot Games', tag: 'MOBA'},
    {title: 'Minecraft', maker: 'Mojang', tag: 'Sandbox'},
    {title: 'Interstellar', maker: 'Christopher Nolan', tag: 'Sci-fi'},
    {title: 'La La Land', maker: 'Damien Chazelle', tag: 'Musical'},
    {title: 'Pulp Fiction', maker: 'Quentin Tarantino', tag: 'Crime'},
    {title: 'Breaking Bad', maker: 'Vince Gilligan', tag: 'Drama'},
    {title: 'The Office', maker: 'Greg Daniels', tag: 'Comedy'},
    {title: 'Game of Thrones', maker: 'David Benioff & D.B. Weiss', tag: 'Fantasy'}
  ]
  const [random, setRandom] = useState(0);
  useEffect(() => {
    if(logWindowOn){setRandom(Math.floor(Math.random() * placeholders.length));}
  }, [logWindowOn, placeholders.length]);

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
        <input type="text" name='title' placeholder={placeholders[random].title}/>
      </fieldset>
      <div className='log_row'>
        <fieldset className='log_inputs'>
          <legend>Image</legend>
          <input type="url" name='image' ref={inputImageRef} onChange={updateImagePreview} placeholder='URL' />
        </fieldset>
        <svg 
          className='image_import'
          style={{display: imagePreview ? "none" : "block"}}
          onClick={fileFocus}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--white-hue)" 
        >
          <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/>
          <path d="m14 19 3 3v-5.5"/>
          <path d="m17 22 3-3"/>
          <circle cx="9" cy="9" r="2"/>
        </svg>
        <svg
          className='image_clear'
          style={{display: imagePreview ? "block" : "none"}}
          onClick={clearInputImage}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--white-hue)"
        >
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        <input type="file" name='import' ref={importRef} onChange={updateImagePreview} accept='image/*' />
        <div className='image_preview'>
          <img src={imagePreview} />
        </div>
      </div>
      <fieldset className='log_inputs'>
        <legend>Maker</legend>
        <input type="text" name='maker' placeholder={placeholders[random].maker}/>
      </fieldset>
      <fieldset className='log_inputs'>
        <legend>Tag</legend>
        <input type="text" name='tag' placeholder={placeholders[random].tag}/>
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