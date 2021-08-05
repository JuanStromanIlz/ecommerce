import styled from 'styled-components';

const Item = styled.div`
  .itemWrapper {
    padding: 1.6rem;
    display: grid;
    grid-template-columns: 100%;
    .detail {
      img {
        display: block;
        width: 65%;
        margin: auto;
        margin-bottom: 1.2rem;
      }
      .addToCart {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        margin-bottom: 2.4rem;
        .price {
          margin-left: auto;
          margin-right: auto;
          font-weight: bold;
          font-size: 1.6rem;
        }
        button {
          box-sizing: border-box;
          cursor: pointer;
          background: ${props => props.theme.black}; 
          color: white;
          border: inherit;
          margin-left: auto;
          margin-right: auto;
          padding: 1.2rem;
          font-size: 1.6rem;
          text-transform: uppercase;
          height: 45px;
          width: fit-content;
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
        .collection {
          font-style: italic;
        }
        .author {
          text-transform: uppercase;
        }
      }
    }
  }
  .disableButton {
    opacity: .6;
  }
  @media (min-width: 920px) {
    .itemWrapper {
      grid-template-columns: [img] 30% [summary] 70%;
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
      <article className='itemWrapper'>
        <div className='detail'>
          <img src={item.img} alt='item'></img>
          <div className='addToCart'>
            <span className='price'>${item.price}</span>
            <button disabled={item.product_quantity === 0} className={item.product_quantity === 0 ? 'disableButton' : null} onClick={openDetail}>
              agregar al carrito
            </button>
          </div>
        </div>
        <div className='summary'>
          <header>
            <h2 className='title'>{item.name}</h2>
          </header>
          <div>
            <span className='collection'>{item.collection}</span>
          </div>
          <div>
            <span className='author'>{item.author}</span>
          </div>
          <p>{item.description}</p>
        </div>
      </article>
    </Item>
  );
}

export default ItemDetail;