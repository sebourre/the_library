import { useState, useRef } from 'react'
import './Card.css'

export default function Card({styleCard, styleCardOptions, styleCardInfo, styleCardBar, styleCardType, formSubmit, displayCardWindow, pos, isBookmarked, onDelete, id, bookmarked, src, title, maker, date, tag, note, type}){
  const cardEditRef = useRef(null);
  const [edit, setEdit] = useState(false);

  function validFormat(e){
    const value = e.target.value;
    if(value.length > 10){
      e.target.value = value.slice(0, 10);
      return;
    }
    if(e.nativeEvent.inputType === 'insertText' || e.nativeEvent.inputType === 'insertFromPaste'){
      if(value.length == 4 || value.length == 7){
        e.target.value = value + '-';
      }
    }
  }

  function formValidation(e){
    const formData = new FormData(e.target);
    const newSrc = formData.get('edit_src');
    const newTitle = formData.get('edit_title');
    const newMaker = formData.get('edit_maker');
    const newDate = formData.get('edit_date');
    const newTag = formData.get('edit_tag');
    const newNote = formData.get('edit_note');
    const newType = formData.get('edit_type');
    clearForm();
    setEdit(false);
    formSubmit(e, id, newSrc, newTitle, newMaker, newDate, newTag, newNote, newType);
  }

  function clearForm(){
    const inputs = cardEditRef.current.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
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
      <div className='card_head'>
        <p>{pos + 1}</p>
        <div className='card_options' style={styleCardOptions}>
          <svg
            style={{
              filter: edit ? 'blur(2px)' : 'none',
              pointerEvents: edit ? 'none' : 'auto'
            }}
            onClick={() => {isBookmarked(id)}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={bookmarked ? 'var(--red-hue)' : 'none'}
            stroke="var(--red-hue)"
          >
            <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
          </svg>
          <svg
            style={{display: edit ? 'none' : 'block'}}
            onClick={() => setEdit(true)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
          >
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          <svg
            style={{display: edit ? 'block' : 'none'}}
            onClick={() => {setEdit(false); clearForm();}}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
          >
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
          <svg
            style={{
              filter: edit ? 'blur(2px)' : 'none',
              pointerEvents: edit ? 'none' : 'auto'
            }}
            onClick={() => onDelete(id)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-hue)"
          >
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
        <p style={{display: edit ? 'none' : 'block'}}>{title}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{maker}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{date}</p>
        <p style={{display: edit ? 'none' : 'block'}}>{tag}</p>
        <div 
          className='card_note'
          style={{
            backgroundColor:
              note >= 75 ? 'var(--green-hue)' : 
              note >= 40 ? 'var(--orange-hue)' : 
              'var(--red-hue)'
          }}
        >
          <p>{note}</p>
        </div>
        <form ref={cardEditRef} style={{display: edit ? 'block' : 'none'}} onSubmit={formValidation} autoComplete='off'>
          <input type='url' name='edit_src' placeholder='url'/>
          <input type='text' name='edit_title' placeholder={title}/>
          <input type='text' name='edit_maker' placeholder={maker}/>
          <input type='text' name='edit_date' pattern='\d{4}-\d{2}-\d{2}' placeholder={date} onChange={validFormat}/>
          <input type='text' name='edit_tag' placeholder={tag}/>
          <div 
            className='card_note'
            style={{backgroundColor: 'var(--secondary-color)'}}>
            <input type='number' name='edit_note' placeholder={note} min={0} max={100}/>
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