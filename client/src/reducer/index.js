const intialState = {
  login: {
    email: '',
    password: ''
  },
  register: {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
};

function reducer(state = intialState, action){
  switch(action.type){
    case 'ADD_LOGIN_EMAIL':
      return {
        ...state,
        login: {
          ...state.login,
          email: action.payload
        }
      };

    case 'ADD_LOGIN_PASSWORD':
      return {
        ...state,
        login: {
          ...state.login,
          password: action.payload
        }
      };

    case 'ADD_REGISTER_USERNAME':
      return {
        ...state,
        register: {
          ...state.register,
          username: action.payload
        }
      };

    case 'ADD_REGISTER_EMAIL':
      return {
        ...state,
        register: {
          ...state.register,
          email: action.payload
        }
      };

    case 'ADD_REGISTER_PASSWORD':
      return {
        ...state,
        register: {
          ...state.register,
          password: action.payload
        }
      };

    case 'ADD_REGISTER_PASSWORD_CONFIRMATION':
      return {
        ...state,
        register: {
          ...state.register,
          password_confirmation: action.payload
        }
      };

    case 'CLEAR_REGISTER':
      return {
        ...state,
        register: intialState.register
      };

    case 'CLEAR_LOGIN':
      return {
        ...state,
        login: intialState.login
      }

    default:
      return state;
  }
}

export default reducer;