import { useContext } from 'react';
import { UserCont } from '../context/UserContext';
import styled from 'styled-components';

const CartComponent = styled.div`
  position: fixed;
  transform: translateY(100%);
  transition: .4s;
  visibility: hidden;
  bottom: 60px;
  right: 0;
  left: 0;
  z-index: 8;
  .cartWrapper {
    background: white;
    overflow: hidden;
    box-sizing: border-box;
    .checkout {
      .checkoutWrapper {
        position: relative;
        height: 44px;
        margin: 1.6rem;
        button {
          cursor: pointer;
          position: absolute;
          bottom: 0;
          top: 0;
          width: 100%;
          color: white;
          font-size: 1.6rem;
          transition: all .3s;
          width: 100%;
          background: ${props => props.theme.black};
          border-radius: 25px;
          border: 1px solid ${props => props.theme.black};
          padding: 1.2rem;
          margin: 0;
          text-align: center;
          color: white;
          font-weight: 700;
          text-transform: uppercase;
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
          img {
            display: block;
            object-fit: contain;
            height: 100px;
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
            font-weight: 700;
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
  @media (hover: hover) {
    .checkoutWrapper button:hover {
      border: 1px solid white !important;
      box-shadow: 0 0 10px 4px ${props => props.theme.greenTop} !important;
      background: ${props => props.theme.greenTop} !important;
      color: white !important;
    }
  }
  @media (min-width: 920px) {
    display: inherit;
    width: 20vw;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateY(0);
    .itemDelete img {
      height: 16px !important;
    }
    .cartList {
      max-height: calc(100vh - 72px) !important;
    }
    .checkoutWrapper button {
      font-size: inherit !important;
    }
  }
`;

function Cart() {
  const {cart, removeItem, checkout} = useContext(UserCont);

  return (
    <CartComponent id='cart'>
      <div className='cartWrapper'>
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
                  <span className='quantityPrice'>{`$${item.price} x ${item.quantity}`}</span>
                </div>
                <div className='itemDelete' onClick={() => removeItem(index)}>
                  <img src={process.env.PUBLIC_URL + '/icons/delete.svg'} alt='delete'></img>
                </div>
              </div>
            )
          : <span className='emptyCart'>¡Tu carrito esta vacio!</span>}
        </div>
        {cart.length !== 0 ? 
          <div className='checkout'>
            <div className='checkoutWrapper'>
              <button onClick={checkout}>
                <span>checkout</span>
              </button>
            </div>
          </div>
        : null}
      </div>
    </CartComponent>
  );
}

export default Cart;