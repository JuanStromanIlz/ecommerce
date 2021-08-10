import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddButton from './AddButton';

const Item = styled.div`
  margin: auto;
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
      margin-bottom: 1.6rem;
      .imgDetail {
        display: block;
        width: 65%;
        margin: auto;
        margin-bottom: 1.6rem;
      }
    }
    .summary {
      max-width: 600px;
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
  @media (hover: hover) {
    .link:hover {
      color: ${props => props.theme.green} !important;
    }
  }
  @media (min-width: 920px) {
    .itemWrapper {
      flex-direction: row;
      gap: 1.6rem;
      .detail {
        margin-bottom: 0;
        .imgDetail {
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
          <img className='imgDetail' src={item.img} alt='item'></img>
          <AddButton disabled={item.product_quantity} callTo={openDetail} />
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