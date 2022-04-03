import React, { useState, useCallback } from 'react';
import { Card, Tabs } from '@shopify/polaris';

import Login from './Login';
import Register from './Register';

function Authentication(){

  const [selected, setSelected] = useState(0);

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
  
  return(
    <div className="center">
      <div className="w-40">
        <Card title="Login/Register">
          <Tabs tabs={ tabs } selected={ selected } onSelect={ handleSelect } fitted>
            <Card.Section title={ tabs[selected].content }>
              { tabs[selected].element }
            </Card.Section>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

export default Authentication;