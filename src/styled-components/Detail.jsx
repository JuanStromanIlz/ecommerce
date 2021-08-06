import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserCont } from '../context/UserContext';

const ProductDetail = styled.div`
  transition: .8s;
  position: fixed;
  transform: translateY(100%);
  inset: 0;
  display: flex;
  flex-direction: column;
  z-index: 11;
  .detailWrapper {
    margin-top: auto;
    button {
      cursor: pointer;
    }
    .closeTab {
      margin-bottom: 1.2rem;
      padding-left: 1.6rem;
      padding-right: 1.6rem;
      display: flex;
      justify-content: flex-end;
      button {
        border: inherit;
        background: inherit;
        padding: 0;
        span {
          font-size: 2.8rem;
          color: white;
        }
      }
    }
    .detalleInfo {
      background: white;
      .product {
        display: flex;
        flex-direction: row;
        gap: 1.6rem;
        padding: 1.6rem;
        .productImage {
          width: 45%;
          max-width: 100px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .productTags {
          display: flex;
          flex-direction: column;
          gap: .4rem;
          .collection {
            font-style: italic;
          }
          .title {
            font-size: 2rem;
            text-transform: uppercase;
          }
          .price {
            margin-top: .6rem;
            font-weight: bold;
          }
        }
      }
      .order {
        display: flex;
        flex-direction: column;
        padding-left: 1.6rem;
        padding-right: 1.6rem;
        padding-bottom: 1.6rem;
        label {
          margin: auto 0;
        }
        .quantity {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .counter {
            display: flex;
            flex-direction: row;
            align-content: center;
            button {
              border: none;
              background: inherit;
              padding: 0 1.4rem;
              span {
                display: block;
              }
              .buttonDisable {
                opacity: .6 !important;
              }
            }
            input {
              width: 60px;
              text-align: center;
              margin: 0;
              padding: 0;
              border: none;
              pointer-events: none;
            }
          }
        }
      }
      .addToCart {
        display: flex;
        flex-direction: row;
        div {
          display: flex;
          .link {
            color: inherit;
            text-decoration: none;
            padding: 1.2rem;
            margin: auto;
          }
          button {
            width: 100%;
            height: 60px;
            border: inherit;
            background: ${props => props.theme.black};
            padding: 1.2rem;
            margin: 0;
            text-align: center;
            color: white;
            font-size: 1.6rem;
            text-transform: uppercase;
            position: relative;
            .adding {
              background: ${props => props.theme.black};
              opacity: 0;
              display: inline-block;
              position: absolute;
              inset: 0;
              display: flex;
              justify-content: center;
            }
            .adding div {
              box-sizing: border-box;
              display: block;
              position: absolute;
              top: 1rem;
              bottom: 1rem;
              aspect-ratio: 1;
              border: .3rem solid #fff;
              border-radius: 50%;
              animation: adding 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
              border-color: #fff transparent transparent transparent;
            }
            .adding div:nth-child(1) {
              animation-delay: -0.45s;
            }
            .adding div:nth-child(2) {
              animation-delay: -0.3s;
            }
            .adding div:nth-child(3) {
              animation-delay: -0.15s;
            }
            @keyframes adding {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          }
        }
        div.moreInfo {
          border-top: 1px solid grey;
        }
        div:last-child {
          flex-grow: 1;  
        }
      }
    }
  }
  @media (hover: hover) {
    .closeTab button:hover span {
      color: ${props => props.theme.black} !important;
    }
  }
  @media (min-width: 920px) {
    .detailWrapper {
      margin: auto;
      width: 40%;
      .addToCart button {
        height: 44px !important;
        font-size: inherit !important;
      }
    }
  }
`;

function Detail({product}) {
  const [card, setCard] = useState({});
  const {addItem} = useContext(UserCont);
  const [quantity, setQuantity] = useState(1);

  function closeDetail() {
    document.getElementById('productDetail').removeAttribute('style');
    document.getElementById('mask').removeAttribute('style');
    document.body.removeAttribute('style');
    setQuantity(1);
  }

  function addToCart() {
    let finalPrice = card.price * quantity;
    let itemToCard = {
      id: card.product_id,
      name: card.name,
      collection: card.collection,
      author: card.author,
      img: card.img,
      quantity: quantity,
      price: finalPrice
    }
    addItem(itemToCard);
    document.getElementsByClassName('adding')[0].style.opacity=1;
    setTimeout(()=> {
      document.getElementsByClassName('adding')[0].removeAttribute('style');
      document.getElementById('addButton').innerHTML='item agregado con exito!'
      setTimeout(() => {
        document.getElementById('addButton').innerHTML='agregar al carrito';
      }, 1100);
    }, 1000);
  }
  /* Quantity */
  function quantityAdd() {
    if (quantity < card.product_quantity) {
      setQuantity(quantity + 1);
    }
  }
  function quantityRest() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  useEffect(() => {
    setCard(product);
  }, [product]);

  return (
    <ProductDetail id='productDetail'>
      <div className='detailWrapper'>
        <div className='closeTab'>
          <button onClick={closeDetail}>
            <span className='material-icons'>close</span>
          </button>
        </div>
        <div className='detalleInfo'>
          <div className='product'>
            <div className='productImage'>
              <img src={card.img} alt='product'></img>
            </div>
            <div className='productTags'>
              <span className='collection'>{card.collection}</span>
              <span className='title'>{card.name}</span>
              <span className='author'>{card.author}</span>
              <span className='price'>${card.price}</span>
            </div>
          </div>
          <div className='order'>
            <div className='quantity'>
              <label>Cantidad</label>
              <div className='counter'>
                <button onClick={quantityRest}>
                  <span className={`material-icons ${quantity === 1 && 'buttonDisable'}`}>remove</span>
                </button>
                <input type='number' value={quantity} readOnly={true}></input>
                <button onClick={quantityAdd}>
                  <span className={`material-icons ${card.product_quantity === quantity && 'buttonDisable'}`}>add</span>
                </button>
              </div>
            </div>
          </div>
          <div className='addToCart'>
            <div className='moreInfo'>
              <Link className='link' to={`/${card.name}`}>Más info</Link>
            </div>
            <div>
              <button onClick={addToCart}>
                <span id='addButton'>Agregar al carrito</span>
                <div className='adding'><div></div><div></div><div></div></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProductDetail>
  );
}

export default Detail;