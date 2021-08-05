import styled from 'styled-components';
import Nav from './Navbar';
import {Cart, CartButton} from './Cart';
import Menu from './Menu';
import Footer from './Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 100%);
  #pageContent {
    margin-bottom: 60px;
    video {
      display: none;
      height: 100vh;
      width: 100%;
      object-fit: cover;
    }
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
      video {
        display: block;
      }
    }
  }
`;

function PageWrapper({children}) {
  return (
    <Wrapper>
      <Nav />
      <Menu />
      <Cart />
      <CartButton />
      <div id='pageContent'>
        {children}
        <Footer />
      </div>
    </Wrapper>
  );
}

export default PageWrapper;