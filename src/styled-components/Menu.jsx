import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserCont } from '../context/UserContext';
import db from '../db.json';

const MenuWrapper = styled.div`
  position: fixed;
  z-index: 9;
  bottom: 0;
  transition: .5s;
  transform: translateY(100%);
  background: ${props => props.theme.black};
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  #menuContainer {
    overflow-y: auto;
    padding: 1.6rem;
    color: white;
    .menuHeader {
      background: ${props => props.theme.black};
      display: none;
      flex-direction: row;
      position: sticky;
      top: 0;
      padding: 1.2rem;
      padding-left: 0;
      #pageLogo {
        .link {
          display: content;
          img {
            display: block;
            object-fit: contain;
            width: 80%;
            height: 55px;
          }
        }
      }
      .cart {
        margin: auto;
        cursor: pointer;
        > div {
          position: relative;
          width: fit-content;
          img {
            display: block;
            height: 22px;
          }
          .itemsInCart {
            color: #fff;
            position: absolute;
            display: grid;
            place-items: center;
            right: -13px;
            top: -8px;
            background: ${props => props.theme.red};
            border-radius: 25px;
            aspect-ratio: 1;
            width: 20px;
            span {
              display: block;
              text-align: center;
            }
          }
        }
      }
    }
    .menuBlock {
      padding: 1.2rem;
      .menuTitle {
        cursor: pointer;
        span {
          text-transform: uppercase;
          font-size: 1.6rem;
          font-weight: 700;
        }
      }
      ul {
        height: 0;
        transition: .5s;
        overflow: hidden;
        margin-top: 1.2rem;
        border-bottom: 1px solid #61ce70;
        li {
          display: flex;
          cursor: pointer;
          .link {
            transition: .2s;
            color: inherit;
            text-decoration: inherit;
            font-size: inherit;
            padding-top: 1.2rem;
            padding-bottom: 1.2rem;
            margin-right: 1rem;
          }
        }
        li:first-child .link {
          padding-top: 0;
        }
      }
    }
  }
  #menuContainer::-webkit-scrollbar {
    width: .4rem;
  }
  #menuContainer::-webkit-scrollbar-track {
    background: transparent;
  }
  #menuContainer::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.green};
    border-radius: 50px;
  }
  @media (hover: hover) {
    .menuBlock {
      span:hover {
        color: ${props => props.theme.green} !important;
      }
      .link:hover {
        color: ${props => props.theme.green} !important;
      }
    }
  }
  @media (min-width: 920px) {
    display: flex;
    grid-column: menuStart / menuEnd;
    transform: translateY(0px) !important;
    bottom: 0 !important;
    width: 20% !important;
    height: 100vh;
    #menuContainer {  
      width: 100%;
      padding-top: 0;
      padding-bottom: 0;
      .menuHeader {
        display: flex;
      }
      .link {
        font-size: 1.4rem !important;
      }
    }
  }
`;

function Menu() {
  const [collections, setCollections] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [open, setOpen] = useState(false);
  const {cart} = useContext(UserCont);
  const [subMenu1, setSubMenu1] = useState(false);
  const [subMenu2, setSubMenu2] = useState(false);

  function openCart() {
    if (!open) {
      document.getElementById('mask').style.cssText='opacity: .6; bottom: 0;';
      document.getElementById('cart').style.cssText='transform: translateX(20vw); border-right: 1px solid black; visibility: visible;';
      setOpen(!open);
    } else {
      document.getElementById('mask').removeAttribute('style');
      document.getElementById('cart').removeAttribute('style');
      setOpen(!open);
    }
  }

  function openSubMenu(id) {
    let title = document.getElementById(id).getElementsByTagName('span')[0];
    let list = document.getElementById(id).getElementsByTagName('ul')[0];
    if (id === 'subMenu1') {
      if (!subMenu1) {
        title.style.color='#61ce70';
        list.style.borderBottom='1px solid #61ce70';
        let listItems = list.getElementsByTagName('li');
        list.style.height=`${41 * listItems.length}px`;
        setSubMenu1(true);
      } else {
        title.removeAttribute('style');
        list.removeAttribute('style');
        setSubMenu1(false);
      }
    } 
    if (id === 'subMenu2') {
      if (!subMenu2) {
        title.style.color='#61ce70';
        list.style.borderBottom='1px solid #61ce70';
        let listItems = list.getElementsByTagName('li');
        list.style.height=`${41 * listItems.length}px`;
        setSubMenu2(true);
      } else {
        title.removeAttribute('style');
        list.removeAttribute('style');
        setSubMenu2(false);
      }
    }
  }

  useEffect(() => {
    let collections = db.map(item => item.collection);
    collections = Array.from(new Set(collections));
    setCollections(collections);
    let authors = db.map(item => item.author);
    authors = Array.from(new Set(authors));
    setAuthors(authors);
  }, []);

  return (
    <MenuWrapper id='menu'>
      <div id='menuContainer'>
        <div className='menuHeader'>
          <div id='pageLogo'>
            <Link className='link' to='/'>
              <img src='https://w4w7a3s7.stackpathcdn.com/wp-content/uploads/2018/10/logo.png' alt='logo'></img>
            </Link>
          </div>
          <div className='cart' onClick={openCart}>
            <div>
              {cart.length > 0 ? 
                <div className='itemsInCart'>
                  <span>{cart.length}</span>
                </div>
              : null}
              <img src={process.env.PUBLIC_URL + '/icons/bag.svg'} alt='bag'></img>
            </div>
          </div>
        </div>
        <div id='subMenu1' className='menuBlock'>
          <div onClick={() => openSubMenu('subMenu1')} className='menuTitle'>
            <span>Colecciones</span>
          </div>
          <ul>
            {collections.map((item, index) => 
              <li key={`collection${index}`}><Link className='link' to={`/collections/${item}`}>{item}</Link></li>
            )}
          </ul>
        </div>
        <div id='subMenu2' className='menuBlock'>
          <div onClick={() => openSubMenu('subMenu2')} className='menuTitle'>
            <span>Autores</span>
          </div>
          <ul>
            {authors.map((item, index) => 
              <li key={`authors${index}`}><Link className='link' to={`/authors/${item}`}>{item}</Link></li>
            )}
          </ul>
        </div>
      </div>
    </MenuWrapper>
  );
} 

export default Menu;