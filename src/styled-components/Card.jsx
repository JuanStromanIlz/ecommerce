import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import styled from 'styled-components';
import AddButton from './AddButton';
import { UserCont } from '../context/UserContext';

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
    button {
      width: 80%;
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
      background-image: url(${props => props.img}); 
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
      font-weight: 700;
    }
    .price {
      font-weight: 900;
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
        font-weight: 900;
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
    :hover {
      .addToCart__desktop {
        visibility: visible;
      }
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

function Card({info}) {
  const cardRef = useRef(null);
  const [card, setCard] = useState({});
  const {viewDetail} = useContext(UserCont);

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
            <AddButton Class={'addToCart__desktop'} disabled={card.product_quantity} callTo={openDetail} />
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
          <AddButton Class={'addToCart__mobile'} disabled={card.product_quantity} callTo={openDetail} />
        </div>
      </Producto>
    </InView>
  );
}

export default Card;