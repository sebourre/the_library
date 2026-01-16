import { useState, useEffect, useRef } from 'react'
import './App.css'

export default function SearchBar({searchCards, resetSearchValue}){
  const searchRef = useRef(null);

  function searchFocus(){
    searchRef.current.focus();
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchFocus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [resetSearchButton, setResetSearchButton] = useState(false);
  function displayResetSearchButton(){
    if(searchRef.current.value.trim() != ""){
      setResetSearchButton(true);
    }else{
      setResetSearchButton(false);
    }
  }

  function resetSearch(){
    searchRef.current.value = "";
    setResetSearchButton(false);
  }

  return(
    <div className='search_bar'>
      <svg
        onClick={searchFocus}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--white-hue)"
      >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input type="search" ref={searchRef} className='search' onChange={() => {searchCards(searchRef); displayResetSearchButton();}} placeholder='Search'/>
      <div>
        <div 
          className='search_shortcut'
          style={{display: resetSearchButton ? 'none' : 'block'}}
        >
          Ctrl + K
        </div>
        <svg
          style={{display: resetSearchButton ? 'block' : 'none'}}
          onClick={() => {resetSearch(); resetSearchValue();}}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--white-hue)"
        >
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}