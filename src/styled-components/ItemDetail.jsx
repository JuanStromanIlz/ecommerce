import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item = styled.div`
  .itemHeader {
    overflow: hidden;
    margin-top: 1.6rem;
    margin-left: 1.6rem;
    margin-right: 1.6rem;
    h2 {
      position: relative;
      display: inline-block;
      font-style: italic;
      font-size: 1.4rem;
    }
    h2:after {
      content: "";
      background-color: white;
      position: absolute;
      width: 100vw;
      border-top: 1px solid ${props => props.theme.black};
      left: 120%;
      top: 50%;
      bottom: 50%;
    }
  }
  .link {
    display: block;
    color: ${props => props.theme.black};
    font-size: inherit;
    font-style: inherit;
    text-decoration: none;
  }
  .itemWrapper {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    .detail {
      img {
        display: block;
        width: 65%;
        margin: auto;
        margin-bottom: 1.6rem;
      }
      .addToCart {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
        button {
          box-sizing: border-box;
          cursor: pointer;
          border: inherit;
          margin: 0;
          padding: 0;
          font-size: inherit;
          background: transparent;
          .buttonWrapper {
            transition: .2s;
            position: relative;
            display: flex;
            flex-direction: row;
            overflow: hidden;
            height: 35px;
            width: 100%;
            margin: 0 auto;
            background: transparent;
            > div {
              width: 100%;
              transition: all .3s;
              color: white;
              text-transform: uppercase;
              display: flex;
              span {
                margin: auto;
              }
            }
            > div:first-child {
              background: transparent;
              opacity: 0;
              position: absolute;
              left: -100%;
              top: 0;
              bottom: 0;
            }
            > div:last-child {
              background: white;
              border: 2px solid ${props => props.theme.black};
              img {
                display: block;
                margin: auto;
                height: 20px;
              }
            }
          }
        }
      }
    }
    .summary {
      .title {
        text-transform: uppercase;
        margin-bottom: 1.2rem;
      }
      > div {
        display: flex;
        margin-bottom: 1.2rem;
        .price {
          font-weight: bold;
        }
        .author {
          text-transform: uppercase;
        }
      }
    }
  }
  .disableButton {
    opacity: .6;
    pointer-events: none;
  }
  @media (hover: hover) {
    .link:hover {
      color: ${props => props.theme.green} !important;
    }
    button:hover {
      transform: scale(1.05);
      .buttonWrapper {
        box-shadow: 0 0 10px 4px ${props => props.theme.green} !important;
        background: ${props => props.theme.green} !important;
        > div:first-child {
          left: 0 !important;
          opacity: 1 !important;
          background: ${props => props.theme.green} !important;
        }
        > div:last-child {
          transform: translateX(100%);
          background: ${props => props.theme.black} !important;
        }
      }
    }
  }
  @media (min-width: 920px) {
    .itemWrapper {
      flex-direction: row;
      gap: 1.6rem;
      .detail {
        img {
          width: 180px;
        }
      }
    }
  }
`;

function ItemDetail({item}) {

  function openDetail() {
    document.body.style.overflow='hidden';
    document.getElementById('productDetail').style.transform='translate(0)';
    document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
  }

  return (
    <Item>
      <div className='itemHeader'>
        <h2><Link className='link' to={`/collections/${item.collection}`}>{item.collection}</Link></h2>
      </div>
      <article className='itemWrapper'>
        <div className='detail'>
          <img src={item.img} alt='item'></img>
          <div className='addToCart'>
            <button disabled={item.product_quantity === 0} className={item.product_quantity === 0 ? 'disableButton' : null} onClick={openDetail}>
              <div className='buttonWrapper'>
                <div><span>agregar al carrito</span></div>
                <div><img src={process.env.PUBLIC_URL + '/icons/bagAdd.svg'} alt='add to bag'></img></div>
              </div>
            </button>
          </div>
        </div>
        <div className='summary'>
          <header>
            <h2 className='title'>{item.name}</h2>
          </header>
          <div>
            <span className='author'>
              <Link className='link' to={`/authors/${item.author}`}>{item.author}</Link>
            </span>
          </div>
          <div>
            <span className='price'>${item.price}</span>
          </div>
          <p>{item.description}</p>
        </div>
      </article>
    </Item>
  );
}

export default ItemDetail;