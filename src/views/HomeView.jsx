import { useEffect, useState } from 'react';
import ItemsList from '../styled-components/ItemsList';
import db from '../db.json';
import PageWrapper from '../styled-components/PageWrapper';

function HomeView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    document.body.removeAttribute('style');
    setItems(db);
  }, []);

  return (
    <PageWrapper>
      <video src="https://w4w7a3s7.stackpathcdn.com/wp-content/uploads/2020/11/aniversario-desktop-light.mp4" autoplay="" loop="" muted="muted" playsinline="" controlslist="nodownload"></video>
      <ItemsList title='Novedades' items={items} />
    </PageWrapper>
  );
}

export default HomeView;