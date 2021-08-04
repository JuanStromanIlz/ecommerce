import { useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Detail from './Detail';

const List = styled.section`
  .listTitle {
    padding: 1.6rem;
    font-size: 1.6rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
  }
  .listWrapper {
    box-sizing: border-box;
    display: grid;
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
        transition-delay: .2s !important;
      }
      > div:nth-child(4n + 3) article {
        transition-delay: .4s !important;
      }
      > div:nth-child(4n +4) article {
        transition-delay: .6s !important;
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
  }

  return (
    <List>
      <h2 className='listTitle'>{title}</h2>
      <div className='listWrapper'>
        {items.map(item => <Card info={item} viewDetail={viewDetail} />)}
      </div>
      <Detail product={itemDetail} />
    </List>
  );
}

export default ItemsList;