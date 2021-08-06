import { useEffect, useState } from 'react';
import ItemsList from '../styled-components/ItemsList';
import db from '../db.json';
import PageWrapper from '../styled-components/PageWrapper';

function HomeView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.document.title= 'Caja Negra Editorial';
    document.getElementById('navMobile').removeAttribute('style');
    document.body.removeAttribute('style');
    document.getElementById('cart').removeAttribute('style');
    document.getElementById('menu').removeAttribute('style');
    setItems(db);
  }, []);

  return (
    <PageWrapper>
      <ItemsList title='Novedades' items={items} />
    </PageWrapper>
  );
}

export default HomeView;