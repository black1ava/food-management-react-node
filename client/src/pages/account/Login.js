import React, { useCallback, useState } from 'react';
import { Form, FormLayout, TextField, Button, Checkbox } from '@shopify/polaris';
import { connect } from 'react-redux';
import {
  addLoginEmail,
  addLoginPassword
} from '../../actions';

function Login(props){

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = useCallback(function(){
    setShowPassword(prevState => !prevState);
  }, []);

  const handleEmailChange = useCallback(function(value){
    props.addLoginEmail(value);
  }, [props]);

  const handlePasswordChange = useCallback(function(value){
    props.addLoginPassword(value);
  }, [props]);

  const handleSubmit = useCallback(function(event){
    event.preventDefault();
    console.log("Login");
  }, []);

  return(
    <Form onSubmit={handleSubmit  }>
      <FormLayout>
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