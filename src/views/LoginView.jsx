import { UserCont } from '../context/UserContext';
import { useContext, useEffect } from 'react';
import LogIn from '../styled-components/LogIn';

function LoginView() {
  const {logIn} = useContext(UserCont);

  function logUser(form) {
    logIn(form);
  }

  useEffect(()=> {
    window.document.title= 'Log In';
  }, []);

  return (
    <LogIn sendForm={logUser} />
  );
}

export default LoginView;