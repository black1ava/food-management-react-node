import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Authentication from './pages/account/Authentication';

export const AuthContext = createContext();

function App(){

  async function checkAuth(){
    const response = await axios.get('/authentication/status');
    return response.data;
  }

  return(
    <AuthContext.Provider value={{ checkAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={ <Authentication /> }/>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;