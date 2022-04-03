import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authentication from './pages/account/Authentication';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={ <Authentication /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;