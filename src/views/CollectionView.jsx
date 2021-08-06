import { useEffect, useState } from 'react';
import ItemsList from '../styled-components/ItemsList';
import db from '../db.json';
import PageWrapper from '../styled-components/PageWrapper';
import { useParams } from 'react-router-dom';

function CollectionView() {
  const [items, setItems] = useState([]);
  const {title} = useParams();

  useEffect(() => {
    window.document.title= title;
    document.getElementById('navMobile').removeAttribute('style');
    document.body.removeAttribute('style');
    document.getElementById('cart').removeAttribute('style');
    document.getElementById('menu').removeAttribute('style');
    let collection = db.filter(item => item.collection === title);
    setItems(collection);
  }, [title]);

  return (
    <PageWrapper>
      <ItemsList title={title} items={items} />
    </PageWrapper>
  );
}

export default CollectionView;