import { createContext, useEffect, useState } from 'react';

const UserCont = createContext();
const {Consumer, Provider} = UserCont;

function UserContext({children}) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  function logIn(form) {
    setIsLogged(true);
    setUser(form);
    localStorage.setItem('user', JSON.stringify(form));
  }

  function addItem(item) {
    let newList = cart;
    newList.push(item);
    setCart([...newList]);
  }

  function removeItem(itemIndex) {
    let newCart = cart.filter((item, index) => index !== itemIndex);
    setCart([...newCart]);
  }

  function checkout() {
    if (isLogged) {
      console.log(user, cart);
    } else {
      console.log('ingrese para realizar esta acción');
    }
  }

  useEffect(() => {
    let localUser = localStorage.getItem('user');
    if (localUser) {
      setIsLogged(true);
    }
  }, []);

  return (
    <Provider value={{
      isLogged: isLogged,
      user: user,
      cart: cart,
      logIn: logIn,
      addItem: addItem,
      removeItem: removeItem,
      checkout: checkout
    }}>
      {children}
    </Provider>
  );
}

export default UserContext;
export {UserCont, Consumer};