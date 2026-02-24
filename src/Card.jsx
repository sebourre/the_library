import { useState, useRef } from 'react'
import './Card.css'

export default function Card({styleCard, styleCardHead, styleCardOptions, styleCardInfo, styleCardMark, styleCardBar, styleCardGreen, styleCardOrange, styleCardRed, styleCardType, formSubmit, displayCardWindow, pos, isBookmarked, updateMessage, onDelete, id, bookmarked, src, title, maker, date, tag, rating, type, searchValue}){
  const cardEditRef = useRef(null);
  const [edit, setEdit] = useState(false);

  function validFormat(e){
    const value = e.target.value;
    e.target.value = value.replace(/[^0-9-]/g, '');
    if(value.length > 10){
      e.target.value = value.slice(0, 10);
      return;
    }
    if(e.nativeEvent.inputType === 'insertText' || e.nativeEvent.inputType === 'insertFromPaste'){
      if(value.length == 4 || value.length == 7){e.target.value = value + '-';}
    }
  }

  function formValidation(e){
    const formData = new FormData(e.target);
    const newSrc = formData.get('edit_src');
    const newTitle = formData.get('edit_title');
    const newMaker = formData.get('edit_maker');
    const newDate = formData.get('edit_date');
    const newTag = formData.get('edit_tag');
    const newRating = formData.get('edit_rating');
    const newType = formData.get('edit_type');
    clearForm();
    setEdit(false);
    formSubmit(e, id, newSrc, newTitle, newMaker, newDate, newTag, newRating, newType);
    updateMessage('edit', title);
  }

  function clearForm(){
    const inputs = cardEditRef.current.querySelectorAll('input');
    inputs.forEach(input => {input.value = '';});
  }

  function hightlight(text, search){
    if(!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} style={styleCardMark}>{part}</mark> : part
    );
  }
  
  return(
    <div 
      className='card' 
      style={styleCard} 
      onMouseLeave={() => {
        if(edit){
          setEdit(false);
          clearForm();
        }
      }}
    >
      <div className='card_head' style={styleCardHead}>
        <p>{pos + 1}</p>
        <div className='card_options' style={styleCardOptions}>
          <svg
            style={{
              filter: edit ? 'blur(2px)' : 'none',
              pointerEvents: edit ? 'none' : 'auto'
            }}
            onClick={() => {isBookmarked(id); updateMessage(!bookmarked, title);}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'var(--accent-color)' : 'none'}
            stroke="var(--accent-color)"
          >
            <title>Bookmark</title>
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          <svg
            style={{display: edit ? 'none' : 'block'}}
            onClick={() => setEdit(true)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-color)"
          >
            <title>Edit</title>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          <svg
            style={{display: edit ? 'block' : 'none'}}
            onClick={() => {setEdit(false); clearForm();}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-color)"
          >
            <title>Cancel</title>
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
          <svg
            style={{
              filter: edit ? 'blur(2px)' : 'none',
              pointerEvents: edit ? 'none' : 'auto'
            }}
            onClick={() => {onDelete(id); updateMessage('delete', title);}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent-color)"
          >
            <title>Delete</title>
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
        </div>
      </div>
      <img src={src}/>
      <div className='card_info' style={styleCardInfo} onClick={edit ? null : () => displayCardWindow(true, id)}>
        <p style={{display: edit ? 'none' : 'block'}}>{hightlight(title, searchValue)}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{hightlight(maker, searchValue)}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{date}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{tag}</p>
        <div className={'card_rating ' + (
            rating >= 75 ? 'green' : 
            rating >= 40 ? 'orange' : 
            'red'
          )}
          style={
            rating >= 75 ? styleCardGreen : 
            rating >= 40 ? styleCardOrange : 
            styleCardRed
          }
        >
          <p>{rating}</p>
        </div>
        <form ref={cardEditRef} style={{display: edit ? 'block' : 'none'}} onSubmit={formValidation} autoComplete='off'>
          <input type='url' name='edit_src' placeholder='url'/>
          <input type='text' name='edit_title' placeholder={title}/>
          <input type='text' name='edit_maker' placeholder={maker}/>
          <input type='text' inputMode='numeric' name='edit_date' pattern='\d{4}-\d{2}-\d{2}' placeholder={date} onChange={validFormat}/>
          <input type='text' name='edit_tag' placeholder={tag}/>
          <div 
            className='card_rating'
            style={{backgroundColor: 'var(--secondary-color)'}}>
            <input type='number' name='edit_rating' placeholder={rating} min={0} max={100}/>
          </div>
          <input type='text' name='edit_type' placeholder={type}/>
          <button type='submit' className='card_edit'>Edit</button>
        </form>
        <div className='card_bar' style={{...styleCardBar, display: edit ? 'none' : 'block'}}></div>
        <p className='card_type' style={{...styleCardType, display: edit ? 'none' : 'block'}}>{type}</p>
      </div>
    </div>
  )
}