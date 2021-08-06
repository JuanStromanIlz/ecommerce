import { useEffect, useState } from 'react';
import ItemsList from '../styled-components/ItemsList';
import db from '../db.json';
import PageWrapper from '../styled-components/PageWrapper';
import { useParams } from 'react-router-dom';

function AuthorView() {
  const [items, setItems] = useState([]);
  const {author} = useParams();

  useEffect(() => {
    window.document.title= author;
    document.getElementById('navMobile').removeAttribute('style');
    document.body.removeAttribute('style');
    document.getElementById('menu').removeAttribute('style');
    document.getElementById('cart').removeAttribute('style');
    let authorTitles = db.filter(item => item.author === author);
    setItems(authorTitles);
  }, [author]);

  return (
    <PageWrapper>
      <ItemsList title={author} items={items} />
    </PageWrapper>
  );
}

export default AuthorView;