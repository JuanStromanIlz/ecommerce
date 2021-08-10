import { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Detail from './Detail';

const List = styled.section`
  .listTitle {
    margin: 1.6rem;
    overflow: hidden;
    h1 {
      position: relative;
      display: inline-block;
      -webkit-text-stroke: 1px ${props => props.theme.black};
      color: transparent;
      font-size: 3.2rem; 
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
  .listWrapper {
    box-sizing: border-box;
    display: grid;
    padding: .8rem;
    grid-template-columns: repeat(2, 50%);
    > div:nth-child(2n) article {
      transition-delay: .2s !important;
    }
  }
  @media (min-width: 920px) {
    .listTitle {
      text-align: left;
    }
    .listWrapper {
      grid-template-columns: repeat(4, calc(100% / 4));
      > div:nth-child(4n + 1) article {
        transition-delay: 0 !important;
      }
      > div:nth-child(4n + 2) article {
        transition-delay: .1s !important;
      }
      > div:nth-child(4n + 3) article {
        transition-delay: .2s !important;
      }
      > div:nth-child(4n +4) article {
        transition-delay: .3s !important;
      }
    }
  }
`;

function ItemsList({title,items}) {
  const [itemDetail, setItemDetail] = useState({});

  function viewDetail(product) {
    setItemDetail(product);
    document.body.style.overflow='hidden';
    document.getElementById('productDetail').style.transform='translate(0)';
    document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
    document.getElementById('cart').removeAttribute('style');
    document.getElementById('menu').removeAttribute('style');
  }

  return (
    <List>
      {title ? 
        <div className='listTitle'>
          <h1>{title}</h1>
        </div>
      : null}
      <div className='listWrapper'>
        {items.map(item => <Card info={item} viewDetail={viewDetail} />)}
      </div>
      <Detail product={itemDetail} />
    </List>
  );
}

export default ItemsList;