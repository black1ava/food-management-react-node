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
  },
  loading: {
    signin: false
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

    case 'SHOW_SIGNIN_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          signin: !state.loading.signin
        }
      };

    default:
      return state;
  }
}

export default reducer;