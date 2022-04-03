import React, { useCallback, useState } from 'react';
import { Form, FormLayout, Button, TextField, Checkbox } from '@shopify/polaris';
import { connect } from 'react-redux';

import { 
  addRegisterEmail,
  addRegisterUsername,
  addRegisterPassword,
  addRegisterPasswordConfirmation
} from '../../actions';

function Register(props){

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleShowPasswordChange = useCallback(function(){
    setShowPassword(prevState => !prevState);
  }, []);

  const handleShowPasswordConfirmationChange = useCallback(function(){
    setShowPasswordConfirmation(prevState => !prevState);
  }, []);

  const handleUsernameChange = useCallback(function(value){
    props.addRegisterUsername(value);
  }, [props]);

  const handleEmailChange = useCallback(function(value){
    props.addRegisterEmail(value);
  }, [props]);

  const handlePasswordChange = useCallback(function(value){
    props.addRegisterPassword(value);
  }, [props]);

  const handlePasswordConfirmationChange = useCallback(function(value){
    props.addRegisterPasswordConfirmation(value);
  }, [props]);

  const handleSubmit = useCallback(function(event){
    event.preventDefault();
    console.log("Register");
  }, []);

  return(
    <Form onSubmit={ handleSubmit }>
      <FormLayout>
        <TextField 
          label="Username"
          type="text"
          value={ props.username }
          onChange={ handleUsernameChange }
        />
        <TextField 
          label="Email"
          type="email"
          value={ props.email }
          onChange={ handleEmailChange }
        />
        <TextField 
          label="Password"
          type={ showPassword ? 'text' : 'password' }
          value={ props.password }
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
  addRegisterPasswordConfirmation
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);