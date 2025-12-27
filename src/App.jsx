import './App.css'
import Log from './Log.jsx'
import Mode from './Mode.jsx'
import Card from './Card.jsx'

const items = [
  {id: 1, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/70/header.jpg?t=1745368462', title: 'Half-Life', dev: 'VALVe', date: '19 nov. 1998', mode: 'Solo', pf: 'Steam', mc: 96},
  {id: 2, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/220/header.jpg?t=1745368545', title: 'Half-Life 2', dev: 'VALVe', date: '16 nov. 2004', mode: 'Solo', pf: 'Steam', mc: 96},
  {id: 3, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/400/header.jpg?t=1745368554', title: 'Portal', dev: 'VALVe', date: '10 oct. 2007', mode: 'Solo', pf: 'Steam', mc: 90},
  {id: 4, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg?t=1745363004', title: 'Portal 2', dev: 'VALVe', date: '19 apr. 2011', mode: 'Solo', pf: 'Steam', mc: 95},
  {id: 5, src: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1749053861', title: 'Counter-Strike 2', dev: 'VALVe', date: '27 sep. 2023', mode: 'Multiplayer', pf: 'Steam', mc: 82}
]

function addItem(){
  console.log('CHECK');
}

function App(){
  const cards = items.map(item => 
    <Card 
    key={item.id} 
    src={item.src}
    title={item.title}
    dev={item.dev}
    date={item.date}
    mode={item.mode}
    pf={item.pf}
    mc={item.mc}
    />
  )

  return(
    <>
      <header>
        <h1>The Library</h1>
        <div className='buttons'>
          <Log onClick={addItem}/>
          <Mode />
        </div>
      </header>
      <div className='library' id='library'>
        {cards}
      </div>
    </>
  )
}

export default App