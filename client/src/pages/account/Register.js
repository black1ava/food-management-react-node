import React, { useCallback, useState } from 'react';
import { Form, FormLayout, Button, TextField, Checkbox } from '@shopify/polaris';
import { connect } from 'react-redux';
import axios from 'axios';

import { 
  addRegisterEmail,
  addRegisterUsername,
  addRegisterPassword,
  addRegisterPasswordConfirmation,
  clearRegister
} from '../../actions';

function Register(props){

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleShowPasswordChange = useCallback(function(){
    setShowPassword(prevState => !prevState);
  }, []);

  const handleShowPasswordConfirmationChange = useCallback(function(){
    setShowPasswordConfirmation(prevState => !prevState);
  }, []);

  const handleUsernameChange = useCallback(function(value){
    props.addRegisterUsername(value);
    setUsernameError('');
  }, [props]);

  const handleEmailChange = useCallback(function(value){
    props.addRegisterEmail(value);
    setEmailError('');
  }, [props]);

  const handlePasswordChange = useCallback(function(value){
    props.addRegisterPassword(value);
    setPasswordError('');
  }, [props]);

  const handlePasswordConfirmationChange = useCallback(function(value){
    props.addRegisterPasswordConfirmation(value);
    setPasswordError('');
  }, [props]);

  const handleSubmit = useCallback(async function(event){
    event.preventDefault();
    
    try {

      const { username, email, password, password_confirmation } = props;

      await axios.post('/authentication/register', {
        username,
        email,
        password,
        password_confirmation
      });

      props.clearRegister();
    }catch(e){
      const { username, password, email } = e.response.data;
      setUsernameError(username);
      setPasswordError(password);
      setEmailError(email);
    }
  }, [props]);

  return(
    <Form onSubmit={ handleSubmit }>
      <FormLayout>
        <TextField 
          label="Username"
          type="text"
          value={ props.username }
          error={ usernameError }
          onChange={ handleUsernameChange }
        />
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
          onChange={ handlePasswordChange}
        />
        <Checkbox 
          label="Show password"
          checked={ showPassword }
          onChange={ handleShowPasswordChange }
        />
        <TextField 
          label="Password confirmation"
          type={ showPasswordConfirmation ? 'text' : 'password' }
          value={ props.password_confirmation }
          onChange={ handlePasswordConfirmationChange }
        />
        <Checkbox 
          label="Show password"
          checked={ showPasswordConfirmation }
          onChange={ handleShowPasswordConfirmationChange }
        />
        <Button primary submit>Register</Button>
      </FormLayout>
    </Form>
  );
}

function mapStateToProps(state){
  const { username, email, password, password_confirmation } = state.register;
  return { 
    username, 
    email, 
    password, 
    password_confirmation 
  };
}

const mapDispatchToProps = {
  addRegisterEmail,
  addRegisterUsername,
  addRegisterPassword,
  addRegisterPasswordConfirmation,
  clearRegister
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);