import { useState, useRef } from 'react'
import './Card.css'

export default function Card({styleCard, styleCardOptions, styleCardInfo, styleCardBar, styleCardType, formSubmit, displayCardWindow, pos, isBookmarked, onDelete, id, bookmarked, src, title, maker, date, tag, note, type}){
  const cardEditRef = useRef(null);
  const [edit, setEdit] = useState(false);

  function formValidation(e){
    const formData = new FormData(e.target);
    const newTitle = formData.get('edit_title');
    const newMaker = formData.get('edit_maker');
    const newDate = formData.get('edit_date');
    const newTag = formData.get('edit_tag');
    clearForm();
    setEdit(false);
    formSubmit(e, id, newTitle, newMaker, newDate, newTag);
  }

  function clearForm(){
    const inputs = cardEditRef.current.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
  }
  
  return(
    <div className='card' style={styleCard}>
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
        <form ref={cardEditRef} style={{display: edit ? 'block' : 'none'}} onSubmit={formValidation} autoComplete='off'>
        <input type='text' name='edit_title' placeholder={title}/>
        <input type='text' name='edit_maker' placeholder={maker}/>
        <input type='text' name='edit_date' pattern='\d{4}-\d{2}-\d{2}' placeholder={date} /*required*//>
        <input type='text' name='edit_tag' placeholder={tag}/>
        <button type='submit' className='card_edit'>Edit</button>
        </form>
        <div className='card_bar' style={styleCardBar}></div>
      </div>
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
      <p className='card_type' style={styleCardType}>{type}</p>
    </div>
  )
}