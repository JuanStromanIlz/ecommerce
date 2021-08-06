import { useEffect, useState } from 'react';
import ItemDetail from '../styled-components/ItemDetail';
import db from '../db.json';
import PageWrapper from '../styled-components/PageWrapper';
import { useParams } from 'react-router-dom';
import Detail from '../styled-components/Detail';

function ItemView() {
  const [item, setItem] = useState([]);
  const {book} = useParams();

  useEffect(() => {
    window.document.title= book;
    document.getElementById('navMobile').removeAttribute('style');
    document.body.removeAttribute('style');
    document.getElementById('cart').removeAttribute('style');
    document.getElementById('menu').removeAttribute('style');
    let item = db.find(item => item.name === book);
    setItem(item);
  }, [book]);

  return (
    <PageWrapper>
      <ItemDetail item={item} />
      <Detail product={item} />
    </PageWrapper>
  );
}

export default ItemView;