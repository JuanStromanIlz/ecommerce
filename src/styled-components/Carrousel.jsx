import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ItemsContainer = styled.div`
  padding: 1.6rem;
  background: ${props => props.theme.disable};
  border-top: 1px solid ${props => props.theme.black};
  .itemHeader {
    overflow: hidden;
    margin-right: auto;
    span {
      position: relative;
      display: inline-block;
      text-transform: uppercase;
    }
    span:after {
      content: "";
      background-color: white;
      position: absolute;
      width: 100vw;
      border-top: 1px solid ${props => props.theme.black};
      left: 120%;
      top: 50%;
      bottom: 50%;
    }
  }
  .carrousel {
    overflow: hidden;
    position: relative;
    height: 250px;
    .carrouselCard {
      pointer-events: none;
      width: fit-content;
      margin: auto;
      z-index: 0;
      position: absolute;
      inset: 0;
      opacity: 0;
      transform: scale(.8);
      transition: 1s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        object-fit: contain;
        display: block;
        margin: auto;
      }
      .cardInfo {
        display: flex;
        flex-direction: column;
        text-align: center;
        .link {
          color: inherit;
          text-decoration: none;
        }
        .collection {
          font-style: italic;
        }
        .title {
          font-size: 2rem;
          text-transform: uppercase;
        }
      }
    }
    .carrouselCard__show {
      pointer-events: auto;
      opacity: 1;
      transform: scale(1);
    }
  }
  .list {
    width: 100%;
    z-index: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1.2rem;
    .listItem {
      cursor: pointer;
      border-radius: 25px;
      padding: .8rem;
      background: ${props => props.theme.grey};
      border: 1px solid ${props => props.theme.disable};
      margin: 0 .8rem;
      transition: .5s;
    }
    .listItem__active {
      background: ${props => props.theme.greenTop};
      box-shadow: 0 0 10px 4px ${props => props.theme.green};
    }
  }
  @media (hover: hover) {
    .listItem:hover {
      background: ${props => props.theme.greenTop};
    }
  }
  @media (min-width: 920px) {
    .carrousel {
      height: 200px;
      .carrouselCard {
        flex-direction: row;
        gap: 1.2rem;
        .cardInfo {
          text-align: left;
        }
      }
    }
  }
`;

function MoreItems({items}) {
  const [index, setIndex] = useState([]);
  const [indexCard, setIndexCard] = useState(0);
  const [touchStartPoint, setTouchStartPoint] = useState(0);
  const [moveDirection, setMoveDirection] = useState(true);

  /* Touch */
  function touchStart(e) {
    setTouchStartPoint(e.changedTouches[0].clientX);
  }
  function touchMove(e) {
    setMoveDirection(e.changedTouches[0].clientX < touchStartPoint);
  }
  function touchEnd() {
    let lastCard = indexCard + 1;
    if (moveDirection && lastCard < index.length) {
      setIndexCard(indexCard +1);
    } else if(!moveDirection && indexCard > 0) {
      setIndexCard(indexCard -1);
    }
  }
  /* Buttons */
  function getCard(index) {
    setIndexCard(index);
  }

  useEffect(()=> {
    setIndex(items);
  }, [items]);

  return (
    <ItemsContainer
      index={index}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
    > 
      <div className='itemHeader'>
        <span>Otros titulos</span>
      </div>
      <div className='carrousel'>
        <div className='carrouselView'>
          {index.map((item, i) => 
            <div className={`carrouselCard  ${indexCard === i ? 'carrouselCard__show' : null}`}>
              <img src={item.img} alt={item.name} height='150px'></img>
              <div className='cardInfo'>
                <Link to={`/books/${item.name}`} className='link'>
                  <span className='collection'>{item.collection}</span>
                </Link>
                <Link to={`/books/${item.name}`} className='link'>
                  <span className='title'>{item.name}</span>
                </Link>
                <Link to={`/books/${item.name}`} className='link'>
                  <span className='author'>{item.author}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='list'>
        {index.map((item, i) => 
          <div onClick={() => getCard(i)} className={`listItem ${indexCard === i ? 'listItem__active' : null}`}></div>
        )}
      </div>
    </ItemsContainer>
  );
}

export default MoreItems;