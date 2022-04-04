import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Card, Tabs } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import LoadingPage from '../loading/LoadingPage';
import { AuthContext } from '../../App';

function Authentication(){

  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelect = useCallback(function(selectedIndex){
    setSelected(selectedIndex);
  }, []);

  const tabs = [
    {
      id: 'login',
      content: 'Login',
      element: <Login />
    },
    {
      id: 'register',
      content: 'Register',
      element: <Register />
    }
  ];

  useEffect(function(){
    async function checkAuth(){
      const auth = await authContext.checkAuth();

      if(auth.status === 'logged-in'){
        navigate('/');
        return;
      }

      setLoading(false);
    }

    checkAuth();
  });
  
  return(
    <div>
      {loading ? <LoadingPage /> : <div className="center">
        <div className="w-40">
          <Card title="Login/Register">
            <Tabs tabs={ tabs } selected={ selected } onSelect={ handleSelect } fitted>
              <Card.Section title={ tabs[selected].content }>
                { tabs[selected].element }
              </Card.Section>
            </Tabs>
          </Card>
        </div>
      </div>}
    </div>
  );
}

export default Authentication;