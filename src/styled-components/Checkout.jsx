import styled from 'styled-components';
import { UserCont } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';

const CheckoutContainer = styled.div`
  .listTitle {
    overflow: hidden;
    padding-left: 1.6rem;
    padding-top: 1.6rem;
    margin-right: 1.6rem;
    margin-bottom: 1.2rem;
    h1 {
      position: relative;
      display: inline-block;
      -webkit-text-stroke: 1px ${props => props.theme.black};
      color: transparent;
      font-size: 3.2rem; 
      font-weight: 900;
    }
    h1:after {
      content: "";
      position: absolute;
      width: 100vw;
      border-top: 1px solid ${props => props.theme.black};
      left: 120%;
      top: 50%;
      bottom: 50%;
    }
  }
  .checkoutWrapper {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    .user {
      margin-bottom: 1.2rem;
      font-size: 2rem;
    }
    .total {
      font-weight: bold;
    }
  }
`;

function Checkout() {
  const {cart, user} = useContext(UserCont);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(()=> {
    let price = 0;
    cart.map(item => price = price + item.price * item.quantity);
    setFinalPrice(price);
  }, [cart]);

  return (
    <CheckoutContainer>
      <div className='listTitle'>
        <h1>Checkout</h1>
      </div>
      <div className='checkoutWrapper'>
        <h3 className='user'>Hola {user.name} el total de tu compra es:</h3>
        <h2 className='total'>${finalPrice}</h2>
      </div>
    </CheckoutContainer>
  );
}

export default Checkout;