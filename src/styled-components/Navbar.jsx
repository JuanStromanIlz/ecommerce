import { useContext, useState } from 'react';
import { UserCont } from '../context/UserContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Mobile = styled.nav`
  z-index: 10;
  position: fixed;
  bottom: 0;
  height: 60px;
  top: auto;
  width: 100%;
  background: ${props => props.theme.black};
  .navWrapper {
    .navList {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      list-style: none;
      margin: 1rem 0;
      li {
        margin: 0;
        padding: .8rem;
        font-size: 1.3rem;
        .link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        img {
          display: inline-block;
          vertical-align: middle;
        }
        .cart {
          position: relative;
          .itemsInCart {
            color: #fff;
            position: absolute;
            right: -1.6rem;
            top: -.6rem;
            font-size: 1.4rem;
            aspect-ratio: 1;
            background: ${props => props.theme.red};
            width: 1.8rem;
            padding: .3rem;
            border-radius: 25px;
            text-align: center;
          }
        }
      }
    }
  }
`;

function Nav() {
  const {cart} = useContext(UserCont);
  const [menu, setMenu] = useState(false);
  const [cartMenu, setCart] = useState(false);

  function openCart() {
    if (!cartMenu) {
      document.body.style.overflow='hidden';
      document.getElementById('navMobile').style.borderTop='1px solid white';
      document.getElementById('productDetail').removeAttribute('style');
      document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
      document.getElementById('cart').style.transform='translateY(0)';
      document.getElementById('menu').removeAttribute('style');
      setCart(!cartMenu);
      if (menu) {
        setMenu(false);
      }
    } else {
      document.body.removeAttribute('style');
      document.getElementById('navMobile').removeAttribute('style');
      document.getElementById('mask').removeAttribute('style');
      document.getElementById('cart').removeAttribute('style');
      document.getElementById('menu').removeAttribute('style');
      setCart(!cartMenu);
    }
  }

  function openMenu() {
    if (!menu) {
      document.body.style.overflow='hidden';
      document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
      document.getElementById('cart').removeAttribute('style');
      document.getElementById('navMobile').style.borderTop='1px solid white';
      document.getElementById('menu').style.cssText='transform: translateY(0); bottom: 60px;';
      setMenu(!menu);
      if (cartMenu) {
        setCart(false);
      }
    } else {
      document.getElementById('mask').removeAttribute('style');
      document.getElementById('navMobile').removeAttribute('style');
      document.body.removeAttribute('style');
      document.getElementById('menu').removeAttribute('style');
      setMenu(!menu);
    }
  }

  return (
    <Mobile id='navMobile'>
      <div className='navWrapper'>
        <ul className='navList'>
          <li onClick={openMenu}>
            <img src={process.env.PUBLIC_URL + '/icons/menu.svg'} alt='menu'></img>
          </li>
          <li>
            <Link className='link' to='/'>
              <img src={process.env.PUBLIC_URL + '/icons/home.svg'} alt='home'></img>
            </Link>
          </li>
          <li>
            <div className='cart' onClick={openCart}>
              {cart.length > 0 ? 
                <span className='itemsInCart'>{cart.length}</span>
              : null}
              <img src={process.env.PUBLIC_URL + '/icons/bag.svg'} alt='bag'></img>
            </div>
          </li>
        </ul>
      </div>
    </Mobile>
  );
}

export default Nav;