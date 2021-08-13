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
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      button {
        padding: 0;
        border: inherit;
        background: transparent;
        padding: 1.2rem 1.6rem;
        span {
          display: block;
          margin: auto;
          color: white;
        }
      }
    }
    .detalleInfo {
      background: white;
      padding: 1.6rem;
      .product {
        display: flex;
        flex-direction: row;
        gap: 1.6rem;
        margin-bottom: 1.6rem;
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
            font-weight: 700;
          }
          .price {
            margin-top: .6rem;
            font-weight: 900;
          }
          .link {
            margin-top: auto;
            font-size: 1.6rem;
            color: ${props => props.theme.black};
          }
        }
      }
      .order {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.6rem;
        .orderHeader {
          overflow: hidden;
          margin-bottom: 1.2rem;
          span {
            position: relative;
            font-weight: 700;
          }
          span:after {
            content: "";
            position: absolute;
            width: 100vw;
            border-top: 1px solid ${props => props.theme.black};
            left: 120%;
            top: 50%;
            bottom: 50%;
          }
        }
        label {
          margin: auto 0;
          font-weight: 700;
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
        button {
          transition: all .3s;
          border: none;
          width: 100%;
          padding: 0;
          margin: 0;
          border-radius: 25px;
          .buttonWrapper {
            transition: 1s;
            position: relative;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            margin: 0 auto;
            border-radius: 25px;
            height: 45px;
            > div {
              border-radius: 25px;
              width: 100%;
              transition: all .3s;
              color: white;
              text-transform: uppercase;
              display: flex;
              padding: 1rem;
              box-sizing: border-box;
              border: 1px solid ${props => props.theme.black};
              background: ${props => props.theme.black};
              span {
                margin: auto;
                font-size: 1.4rem;
                font-weight: 700;
              }
            }
            > div:first-child {
              border: 1px solid ${props => props.theme.greenTop};
              background: ${props => props.theme.greenTop};
              opacity: 0;
              position: absolute;
              left: -100%;
              top: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
  @media (hover: hover) {
    .link:hover {
      color: ${props => props.theme.green} !important;
    }
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
    let itemToCard = {
      id: card.product_id,
      name: card.name,
      collection: card.collection,
      author: card.author,
      img: card.img,
      quantity: quantity,
      price: card.price
    }
    addItem(itemToCard);
      let wrapper = document.getElementsByClassName('addToCart')[0].getElementsByClassName('buttonWrapper')[0];
      let firstDiv = wrapper.getElementsByTagName('div')[0];
      let lastDiv = wrapper.getElementsByTagName('div')[1];
      wrapper.style.boxShadow='0 0 10px 4px #3EC450';
      firstDiv.style.cssText='left: 0; opacity: 1; border-color: white;';
      lastDiv.style.cssText='transform: translateX(100%);';
      setTimeout(()=> {
        wrapper.removeAttribute('style');
        firstDiv.removeAttribute('style');
        lastDiv.removeAttribute('style');
      }, 2500);
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
              <Link to={`/books/${card.name}`} className='link'>Ver detalle</Link>
            </div>
          </div>
          <div className='order'>
            <div className='orderHeader'>
              <span>Información de la orden</span>
            </div>
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
            <button onClick={addToCart}>
              <div className='buttonWrapper'>
                <div><span>buena eleccion</span></div>
                <div><span>agregar al carrito</span></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </ProductDetail>
  );
}

export default Detail;