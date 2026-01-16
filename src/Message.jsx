import './App.css'

export default function Message({messageRef, message}){
  return(
    <div ref={messageRef} className='message'>{message}</div>
  )
}