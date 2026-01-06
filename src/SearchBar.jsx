import './SearchBar.css'

export default function SearchBar({searchCards}){
  return(
    <div className='search_bar'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="whitesmoke"
      >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input type="text" className='search' onChange={searchCards} placeholder='Search'/>
    </div>
  )
}