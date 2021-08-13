import styled from 'styled-components';
import Nav from './Navbar';
import Cart from './Cart';
import Menu from './Menu';
import Footer from './Footer';
import Detail from './Detail';
import { useContext } from 'react';
import { UserCont } from '../context/UserContext';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  #pageContent {
    position: relative;
    margin-bottom: 60px;
  }
  #navDesktop {
    display: none;
  }
  @media (min-width: 920px) {
    grid-template-columns: [menuStart] 20% [menuEnd] 80% [contentEnd];
    #navMobile {
      display: none;
    }
    #pageContent {
      margin-bottom: 0;
      grid-column: menuEnd / contentEnd;
    }
  }
`;

function PageWrapper({children}) {
  const {productDetail} = useContext(UserCont);
  
  return (
    <Wrapper onUpdate={window.scrollTo(0, 0)}>
      <Nav />
      <Menu />
      <Cart />
      <Detail product={productDetail} />
      <div id='pageContent'>
        <div id='mask'></div>
        {children}
        <Footer />
      </div>
    </Wrapper>
  );
}

export default PageWrapper;