import { useContext, useState } from 'react';
import { UserCont } from '../context/UserContext';
import styled from 'styled-components';

const CartComponent = styled.div`
  position: fixed;
  transform: translateY(100%);
  transition: .8s;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .cartWrapper {
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 20%);
    background: white;
    overflow: hidden;
    .closeTab {
      position: sticky;
      top: 0;
      right: 0;
      left: 0;
      background: white;
      padding: 1.6rem;
      padding-bottom: 0;
      display: flex;
      justify-content: flex-end;
      button {
        border: inherit;
        background: inherit;
        padding: 0;
        span {
          font-size: 2.8rem;
          color: ${props => props.theme.black};
        }
      }
    }
    .checkout {
      .checkoutWrapper {
        position: relative;
        height: 60px;
        button {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          top: 0;
          width: 100%;
          padding: 1.2rem;
          font-weight: bold;
          letter-spacing: 2.2px;
          text-transform: capitalize;
          border: inherit;
          background: ${props => props.theme.black};
          margin: 0;
          text-align: center;
          color: white;
          font-size: 1.8rem;
        }
      }
    }
    .cartList {
      display: flex;
      flex-direction: column;
      padding: 1.6rem;
      overflow-y: auto;
      min-height: 100px;
      max-height: 65vh;
      box-sizing: border-box;
      .cartItem {
        display: flex;
        flex-direction: row;
        gap: 1.6rem;
        padding: 1rem 0;
        .itemImg {
          aspect-ratio: 3 / 4;
          max-height: 100px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .itemInfo {
          display: flex;
          flex-direction: column;
          gap: .4rem;
          .collection {
            font-style: italic;
          }
          .title {
            text-transform: uppercase;
          }
          .quantityPrice {
            font-weight: bold;
          }
        }
        .itemDelete {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          img {
            display: block;
            cursor: pointer;
          }
        }
      }
      .emptyCart {
        display: block;
        margin: auto;
        font-size: 1.6rem;
      }
    }
    .cartList::-webkit-scrollbar {
      width: .4rem;
    }
    .cartList::-webkit-scrollbar-track {
      background: transparent;
    }
    .cartList::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.black};
      border-radius: 50px;
    }
  }
  @media (min-width: 920px) {
    display: inherit;
    width: 250px;
    top: 7rem;
    left: auto;
    bottom: auto;
    transform: translateX(200%);
    .closeTab {
      display: none !important;
    }
    .checkoutWrapper {
      height: 44px !important;
      margin: 1.6rem !important;
      button {
        font-size: inherit !important;
      }
    }
    .itemDelete img {
      height: 16px !important;
    }
    .cartList {
      max-height: 300px !important;
    }
  }
`;

function Cart() {
  const {cart, removeItem} = useContext(UserCont);

  function closeCart() {
    document.body.removeAttribute('style');
    document.getElementById('mask').removeAttribute('style');
    document.getElementById('cart').removeAttribute('style');
  }

  function deleteitem(index) {
    removeItem(index);
  }

  return (
    <CartComponent id='cart'>
      <div className='cartWrapper'>
        <div className='closeTab'>
          <button onClick={closeCart}>
            <span class="material-icons">close</span>
          </button>
        </div>
        <div className='cartList'>
          {cart.length !== 0 ? 
            cart.map((item, index) => 
              <div className='cartItem'>
                <div className='itemImg'>
                  <img src={item.img} alt='item'></img>
                </div>
                <div className='itemInfo'>
                  <span className='collection'>{item.collection}</span>
                  <span className='title'>{item.name}</span>
                  <span className='author'>{item.author}</span>
                  <span className='quantityPrice'>{`${item.quantity} x ${item.price}`}</span>
                </div>
                <div className='itemDelete' onClick={() => deleteitem(index)}>
                  <img src={process.env.PUBLIC_URL + '/icons/delete.svg'} alt='delete'></img>
                </div>
              </div>
            )
          : <span className='emptyCart'>¡Tu carrito esta vacio!</span>}
        </div>
        {cart.length !== 0 ? 
          <div className='checkout'>
            <div className='checkoutWrapper'>
              <button>checkout</button>
            </div>
          </div>
        : null}
      </div>
    </CartComponent>
  );
}

const Button = styled.div`
  position: fixed;
  cursor: pointer;
  z-index: 11;
  top: 1.6rem;
  right: 1.6rem;
  display: none;
  background: ${props => props.theme.black};
  box-shadow: 0 .4rem 1.2rem 0 rgb(0 0 0 / 10%);
  border-radius: 25px;
  padding: 1rem 1.6rem;
  span {
    color: white;
    display: block;
    margin: auto 0;
    padding-right: 1rem;
    text-transform: uppercase;
    font-size: 1.4rem;
  }
  img {
    display: block;
    margin: auto;
  }
  .itemsInCart {
    color: #fff;
    position: absolute;
    right: -5%;
    top: -5%;
    font-size: 1.4rem;
    aspect-ratio: 1;
    background: ${props => props.theme.red};
    width: 1.8rem;
    padding: .3rem;
    border-radius: 25px;
    text-align: center;
  }
  @media (min-width: 920px) {
    display: flex;
  }
`;

function CartButton() {
  const {cart} = useContext(UserCont);
  const [open, setOpen] = useState(false);

  function openCart() {
    if (!open) {
      if (window.innerWidth >= 920) {
        document.getElementById('mask').removeAttribute('style');
        document.getElementById('productDetail').removeAttribute('style');
        document.getElementById('cart').style.cssText='transform: translateY(0); right: 1.6rem;';
        setOpen(!open);
      } else {
        document.getElementById('productDetail').removeAttribute('style');
        document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
        document.getElementById('cart').style.cssText='transform: translateY(0); right: 1.6rem;';
        setOpen(!open);
      }
    } else {
      document.body.removeAttribute('style');
      document.getElementById('mask').removeAttribute('style');
      document.getElementById('cart').removeAttribute('style');
      setOpen(!open);
    }
  }

  return (
    <Button onClick={openCart}>
      <span>Carrito</span>
      {cart.length > 0 ? 
        <span className='itemsInCart'>{cart.length}</span>
      : null}
      <img src={process.env.PUBLIC_URL + '/icons/bag.svg'} alt='bag'></img>
    </Button>
  );
}

export {Cart, CartButton};