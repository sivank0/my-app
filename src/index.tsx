import ReactDOM from 'react-dom/client';
import './index.css';
import {CountryList} from './countries/countryList';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import CountryEditor from './countries/countryEditor'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
  <BrowserRouter>
  <div className="navigationTop">
    <NavLink to="/" className={"navigation"}>Список стран</NavLink>
  </div>
  <div className="navigationLeft">
    <NavLink to="/addCountry/" className={"navigation"}>Добавление страны</NavLink>
  </div>
    <Routes>
      <Route path="/" element={<CountryList/>}/>
      <Route path="/addCountry/" element={ <CountryEditor />}/>
      <Route path="/countryEditor/:code/" element={<CountryEditor/>}/>
    </Routes>
  </BrowserRouter>
);
