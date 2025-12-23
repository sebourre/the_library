import './App.css'

const items = [
  {id: 1, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/70/header.jpg?t=1745368462', title: 'Half-Life', dev: 'VALVe', date: '19 nov. 1998', mode: 'Solo', pf: 'Steam', mc: 96},
  {id: 2, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/header.jpg?t=1745368554', title: 'Portal', dev: 'VALVe', date: '10 oct. 2007', mode: 'Solo', pf: 'Steam', mc: 90},
  {id: 3, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/10/header.jpg?t=1745368572', title: 'Counter-Strike', dev: 'VALVe', date: '1 nov. 2000', mode: 'Multiplayer', pf: 'Steam', mc: 74}
]

function Card({src, title, dev, date, mode, pf}){
  return (
    <div className='card'>
      <img src={src}></img>
      <p className='card_title'>{title}</p>
      <div className='card_info'>
        <p>{dev}</p>
        <p>{date}</p>
        <p>{mode}</p>
        <p>{pf}</p>
      </div>
    </div>
  )
}

function App() {
  const cards = items.map(item => 
    <Card 
    key={item.id} 
    src={item.src}
    title={item.title}
    dev={item.dev}
    date={item.date}
    mode={item.mode}
    pf={item.pf}
    />
  )

  return (
    <>
      <h1>The Library</h1>
      <div className='library'>
        {cards}
      </div>
    </>
  )
}

export default App