import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';

const Producto = styled.article`
  opacity: 0;
  transition: .4s;
  text-align: center;
  padding: 1rem .8rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  .link {
    display: contents;
    color: inherit;
    text-decoration: inherit;
  }
  .addToCart__mobile {
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    background: white;
    border: 2px solid ${props => props.theme.black};
    padding: .6rem;
    font-size: inherit;
    img {
      height: 20px;
    }
  }
  .addToCart__desktop {
    display: none;
    visibility: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2.6rem;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    border: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
    background: transparent;
    .buttonWrapper {
      position: relative;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      height: 45px;
      width: 80%;
      margin: 0 auto;
      background: ${props => props.theme.black};
      > div {
        width: 100%;
        transition: all 0.3s;
        color: white;
        font-size: 1.4rem;
        text-transform: uppercase;
        display: flex;
        background: ${props => props.theme.black};
        span {
          margin: auto;
        }
      }
      > div:first-child {
        position: absolute;
        left: -100%;
        top: 0;
        bottom: 0;
      }
    }
  }
  .imgContainer {
    position: relative;
    cursor: pointer;
    aspect-ratio: 3 / 4;
    margin-bottom: 1rem;
    overflow: hidden;
    .imageShow {
      transition: .8s;
      position: absolute;
      inset: 0;
      ${'' /* background-image: url(${props => props.img});  */}
      background-color: ${props => props.theme.grey};
      background-position: center center;
      background-repeat: no-repeat;
      overflow: hidden;
      background-size: contain;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .collection {
      font-style: italic;
      margin-bottom: .4rem;
    }
    .title {
      cursor: pointer;
      text-transform: uppercase;
      margin-bottom: .4rem;
    }
    .price {
      font-weight: bold;
      margin-top: .6rem;
      margin-bottom: 3rem;
    }
  }
  .disableImg {
    .imageShow {
      opacity: .6;
    }
    .disableText {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.4rem;
      background: transparent;
      background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9));
      span {
        margin: 0 .6rem;
        font-weight: bold;
      }
    }
  }
  .disableButton {
    z-index: -1;
    opacity: .6;
    background: ${props => props.theme.disable} !important;
    border-color: ${props => props.theme.disable} !important;
  }
  @media (hover: hover) {
    .addToCart__desktop:hover .buttonWrapper {
      > div:first-child {
        left: 0;
      }
      > div:last-child {
        transform: translateX(100%);
      }
    }
    :hover {
      .addToCart__desktop {
        visibility: visible;
      }
    }
    .imageShow:hover {
      transform: scale(1.1);
    }
  }
  @media (min-width: 920px) {
    .addToCart__desktop {
        display: block;
      }
    .addToCart__mobile {
      display: none !important;
    }
  }  
`;

function Card({info, viewDetail}) {
  const cardRef = useRef(null);
  const [card, setCard] = useState({});

  function setBackground(inView) {
    if (inView) {
      cardRef.current.style.opacity=1;
    } else {
      cardRef.current.removeAttribute('style');
    }
  }

  function openDetail() {
    if (card.product_quantity > 0) {
      viewDetail(card);
    }
  }

  useEffect(() => {
    setCard(info);
  }, [info]);

  return (
    <InView as='div' triggerOnce={true} threshold={.3} onChange={inView => setBackground(inView)}>
      <Producto ref={cardRef} color={card.color} img={card.img}>
        <div className={`imgContainer ${card.product_quantity === 0 ? 'disableImg' : null}`}>
          <Link className='link' to={`/books/${card.name}`}>
            <div className='imageShow'></div>
          </Link>
          {card.product_quantity === 0 ?
            <div className='disableText'>
              <span>AGOTADO</span>
            </div>
          : null}
          {card.product_quantity !== 0 ?
            <button disabled={card.product_quantity === 0} className={`addToCart__desktop ${card.product_quantity === 0 ? 'disableButton' : null}`} onClick={openDetail}>
              <div className='buttonWrapper'>
                <div><span>agregar al carrito</span></div>
                <div><span>agregar al carrito</span></div>
              </div>
            </button>
          : null}
        </div>
        <div className='info'>
          <Link className='link' to={`/collections/${card.collection}`}>
            <span className='collection'>{card.collection}</span>
          </Link>
          <Link className='link' to={`/books/${card.name}`}>
            <span className='title'>{card.name}</span>
          </Link>
          <Link className='link' to={`/authors/${card.author}`}>
            <span className='author'>{card.author}</span>
          </Link> 
          <span className='price'>${card.price}</span>
          <button disabled={card.product_quantity === 0} className={`addToCart__mobile ${card.product_quantity === 0 ? 'disableButton' : null}`} onClick={openDetail}>
            <img src={process.env.PUBLIC_URL + '/icons/bagAdd.svg'} alt='add to bag'></img>
          </button>
        </div>
      </Producto>
    </InView>
  );
}

export default Card;