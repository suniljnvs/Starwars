import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Favourite from './component/favourites/Favourite';
import Screen1 from './screen/Screen1';
import Screen2 from './screen/Screen2';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Screen1 />} />
          <Route path='/details' element={<Screen2 />} >
            <Route path=':charId' element={<Screen2 />} />
          </Route>
          <Route path='/favourites' element={<Favourite />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;