import ReactDOM from 'react-dom/client';
import './index.css';
import {CountryList} from './countries/countryList';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import CountryEditor from './countries/countryEditor'; 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render( 
  <BrowserRouter>
  <div className="navigationTop">
    <NavLink to="/" className={"navigation"}>Страны</NavLink>
    <NavLink to="/" className={"navigation"}>Регионы</NavLink>
  </div>
  <div className="navigationLeft">
    <NavLink to="/country/add/" className={"navigation"}>Добавление страны</NavLink>
  </div>
    <Routes>
        <Route path="/" element={<CountryList/>}/>
        <Route path="/country/add/" element={ <CountryEditor />}/>
        <Route path="/country/edit/:code/" element={<CountryEditor/>}/>
    </Routes>

  </BrowserRouter>
);
