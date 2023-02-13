import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'


// component imports
import Map from "./components/Map";
import Navbar from "./components/Navbar";


export default function App() {


  return (
    <div>
        <Router>
          <header>
            <Navbar />
          </header>
          <div className='map'>
            <main>
              <Map />
            </main>
          </div>
        </Router>
      </div>

  );
}
