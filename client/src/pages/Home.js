import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../App';
import LoadingPage from './loading/LoadingPage';
import PageLayout from './layout/PageLayout';

function Home(){

  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(function(){
    async function checkAuth(){
      const auth = await authContext.checkAuth();
      if(auth.status === 'logged-out'){
        navigate('/auth');
        return;
      }

      setLoading(false);
    }

    checkAuth();
  }, [navigate, authContext]);

  return(
    <div>
      { loading ? <LoadingPage /> :  <PageLayout /> }
    </div>
  );
}

export default Home;