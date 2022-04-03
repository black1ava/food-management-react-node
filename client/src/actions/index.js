export function addLoginEmail(payload){
  return {
    type: 'ADD_LOGIN_EMAIL',
    payload
  };
}

export function addLoginPassword(payload){
  return {
    type: 'ADD_LOGIN_PASSWORD',
    payload
  };
}

export function addRegisterUsername(payload){
  return {
    type: 'ADD_REGISTER_USERNAME',
    payload
  };
}

export function addRegisterEmail(payload){
  return {
    type: 'ADD_REGISTER_EMAIL',
    payload
  };
}

export function addRegisterPassword(payload){
  return {
    type: 'ADD_REGISTER_PASSWORD',
    payload
  };
}

export function addRegisterPasswordConfirmation(payload){
  return {
    type: 'ADD_REGISTER_PASSWORD_CONFIRMATION',
    payload
  };
}