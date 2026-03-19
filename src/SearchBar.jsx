import { useState, useEffect, useRef } from 'react'
import './App.css'

export default function SearchBar({searchCards, clearSearchValue}){
  const searchRef = useRef(null);

  function searchFocus(){searchRef.current.focus();}
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchFocus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {window.removeEventListener("keydown", handleKeyDown);}
  }, []);

  const [placeholder, setPlaceholder] = useState("Search");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  useEffect(() => {
    if(isSearchFocused){
      const dots = ["", ".", "..", "..."];
      let i = 0;
      const interval = setInterval(() => {
        setPlaceholder(`Search${dots[i]}`);
        i = (i + 1) % dots.length;
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isSearchFocused]);

  const [clearSearchButton, setClearSearchButton] = useState(false);
  function displayClearSearchButton(){
    if(searchRef.current.value.trim() != ""){setClearSearchButton(true);}
    else{setClearSearchButton(false);}
  }

  function clearSearch(){
    searchRef.current.value = "";
    setClearSearchButton(false);
  }

  return(
    <div className='search_bar' onClick={searchFocus}>
      <svg
        style={isSearchFocused ? {animation: 'none'} : null}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isSearchFocused ? 'var(--white-hue)' : 'none'}
        stroke="var(--white-hue)"
      >
        <title>Search</title>
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input 
        type="search" 
        ref={searchRef} 
        className='search' 
        onChange={() => {searchCards(searchRef); displayClearSearchButton();}} 
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => {setIsSearchFocused(false); setPlaceholder("Search");}}
        placeholder={placeholder}
      />
      <div className='search_end'>
        <code
          className='search_shortcut'
          style={{display: clearSearchButton ? 'none' : 'block'}}
        >
          Ctrl + K
        </code>
        <svg
          style={{display: clearSearchButton ? 'block' : 'none'}}
          onClick={() => {clearSearch(); clearSearchValue();}}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--white-hue)"
        >
          <title>Clear</title>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}