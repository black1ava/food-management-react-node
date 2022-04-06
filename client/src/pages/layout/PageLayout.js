import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Frame, TopBar } from '@shopify/polaris';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../App';
import LoadingPage from '../loading/LoadingPage';


function PageLayout(){

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [initial, setInitial] = useState('');
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  const handleUserMenuToggle = useCallback(function(){
    setUserMenuOpen(prevState => !prevState);
  }, []);

  useEffect(function(){
    async function getUser(){
      try{

        async function checkAuth(){
          const auth = await authContext.checkAuth();
          if(auth.status === 'logged-out'){
            navigate('/auth');
            return;
          }
        }
    
        checkAuth();

        const response = await axios.get('/user');
        const { username } = response.data;
        setUsername(username);
        setInitial(username[0].toUpperCase());

        setLoading(false);
      }catch(e){
        console.error(e.response.data);
      }
    }

    getUser();
  }, [authContext, navigate]);
    
  const userMenuMarkUp = (
    <TopBar.UserMenu 
      name={ username }
      initials={ initial }
      actions={[
        { items: [
          { content: 'Sign out' }
        ]}
      ]}
      open={ userMenuOpen }
      onToggle={ handleUserMenuToggle }
    />
  );

  const topBarMarkUp = (
    <TopBar 
      userMenu={ userMenuMarkUp }
    />
  );

  return(
    <div>
      { loading ? <LoadingPage /> : <Frame topBar={ topBarMarkUp }>
  
      </Frame> }
    </div>
  );
}

export default PageLayout;