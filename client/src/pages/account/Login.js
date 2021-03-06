import React, { useCallback, useState } from 'react';
import { Form, FormLayout, TextField, Button, Checkbox } from '@shopify/polaris';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  addLoginEmail,
  addLoginPassword,
  clearLogin,
  showSigninLoading
} from '../../actions';
import SigninLoading from '../components/SigninLoading';

function Login(props){

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleShowPasswordChange = useCallback(function(){
    setShowPassword(prevState => !prevState);
  }, []);

  const handleEmailChange = useCallback(function(value){
    props.addLoginEmail(value);
    setEmailError('');
  }, [props]);

  const handlePasswordChange = useCallback(function(value){
    props.addLoginPassword(value);
    setPasswordError('');
  }, [props]);

  const handleSubmit = useCallback(async function(event){
    event.preventDefault();
    try {
      const { email, password } = props;
      props.showSigninLoading();
      await axios.post('/authentication/login', { email, password });
      props.showSigninLoading();
      navigate('/');
    }catch(e){
      const { email, password } = e.response.data;
      setEmailError(email);
      setPasswordError(password);
    }
  }, [props, navigate]);

  return(
    <div>
      <SigninLoading open={ props.signinLoading } />
      <Form onSubmit={handleSubmit  }>
        <FormLayout>
          <TextField 
            label="Email"
            type="email"
            value={ props.email }
            error={ emailError }
            onChange={ handleEmailChange }
          />
          <TextField 
            label="Password"
            type={ showPassword ? 'text' : 'password' }
            value={ props.password }
            error={ passwordError }
            onChange={ handlePasswordChange }
          />
          <Checkbox 
            label="Show password"
            checked={ showPassword }
            onChange={ handleShowPasswordChange }
          />
          <Button submit primary>Login</Button>
        </FormLayout>
      </Form>
    </div>
  );
}

function mapStateToProps(state){
  return {
    email: state.login.email,
    password: state.login.password,
    signinLoading: state.loading.signin
  };
}

const mapDispatchToProps = {
  addLoginEmail,
  addLoginPassword,
  clearLogin,
  showSigninLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);