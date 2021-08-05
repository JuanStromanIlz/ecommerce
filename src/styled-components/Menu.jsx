import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
  #menuContainer {
    overflow-y: auto;
    padding: 1.6rem;
    color: white;
    #pageLogo {
      display: none;
      padding: 1.2rem 0;
      .link {
        display: content;
        img {
          display: block;
          object-fit: contain;
          width: 80%;
        }
      }
    }
    .menuBlock {
      padding: 1.2rem;
      .menuTitle {
        overflow: hidden;
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;
        span {
          position: relative;
        }
        span:after {
          content: "";
          background-color: white;
          position: absolute;
          width: 100vw;
          border-top: 1px solid white;
          left: 120%;
          top: 50%;
          bottom: 50%;
        }
      }
      ul {
        li {
          display: flex;
          cursor: pointer;
          .link {
            color: inherit;
            text-decoration: inherit;
            text-transform: uppercase;
            font-size: 1.6rem;
            padding-top: 1.2rem;
            padding-bottom: 1.2rem;
            margin-right: 1rem;
          }
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
    background-color: white;
    border-radius: 50px;
  }
  @media (hover: hover) {
    .menuBlock .link:hover {
      position: relative;
      :after {
        content: '';
        position: absolute;
        bottom: .8rem;
        left: 0;
        width: 100%;
        border-top: 1px solid ${props => props.theme.green};
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
      #pageLogo {
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
        <div id='pageLogo'>
          <Link className='link' to='/'>
            <img src='https://w4w7a3s7.stackpathcdn.com/wp-content/uploads/2018/10/logo.png' alt='logo'></img>
          </Link>
        </div>
        <div className='menuBlock'>
          <div className='menuTitle'>
            <span>Colecciones</span>
          </div>
          <ul>
            {collections.map(item => 
              <li><Link className='link' to={`/collections/${item}`}>{item}</Link></li>
            )}
          </ul>
        </div>
        <div className='menuBlock'>
          <div className='menuTitle'>
            <span>Autores</span>
          </div>
          <ul>
            {authors.map(item => 
              <li><Link className='link' to={`/authors/${item}`}>{item}</Link></li>
            )}
          </ul>
        </div>
      </div>
    </MenuWrapper>
  );
} 

export default Menu;