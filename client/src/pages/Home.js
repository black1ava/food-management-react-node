import React, { useContext, useEffect, useState } from 'react';
import { Card } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../App';
import LoadingPage from './loading/LoadingPage';

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
      { loading ? <LoadingPage /> : <Card title="Home" sectioned>
        <h1>Home</h1>
      </Card> }
    </div>
  );
}

export default Home;