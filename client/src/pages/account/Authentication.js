import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Card, Tabs } from '@shopify/polaris';

import Login from './Login';
import Register from './Register';
import LoadingPage from '../loading/LoadingPage';
import { AuthContext } from '../../App';

function Authentication(){

  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

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
      const isLoggedin = await auth.checkAuth();
      setLoading(false);
      console.log(isLoggedin);
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