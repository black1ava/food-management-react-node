import React, { useCallback, useState } from 'react';
import { Form, FormLayout, TextField, Button, Checkbox } from '@shopify/polaris';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  addLoginEmail,
  addLoginPassword
} from '../../actions';

function Login(props){

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

      const response = await axios.post('/authentication/login', { email, password });
      console.log(response.data);
    }catch(e){
      const { email, password } = e.response.data;
      setEmailError(email);
      setPasswordError(password);
    }
  }, [props]);

  return(
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
  );
}

function mapStateToProps(state){
  return {
    email: state.login.email,
    password: state.login.password
  };
}

const mapDispatchToProps = {
  addLoginEmail,
  addLoginPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);