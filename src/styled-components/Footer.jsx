import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Foot = styled.footer`
  background: ${props => props.theme.disable};
  .footerWrapper {
    padding: 1.6rem;
    display: grid;
    grid-template-columns: 100%;
    .footerBox {
      margin-bottom: 1.6rem;
      .boxTitle {
        overflow: hidden;
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;
        span {
          position: relative;
        }
        span:after {
          content: "";
          position: absolute;
          width: 100vw;
          border-top: 1px solid ${props => props.theme.black};
          left: 120%;
          top: 50%;
          bottom: 50%;
        }
      }
      .icon {
        display: flex;
        width: 40px;
        aspect-ratio: 1;
        height: 40px;
        margin-right: 1.2rem;
        img {
          display: block;
          margin: auto;
        }
      }
      ul {
        li {
          display: flex;
          padding-bottom: .6rem;
          a, span {
            word-break: break-word;
          }
          .link {
            color: inherit;
            text-decoration: inherit;
            text-transform: capitalize;
          }
        }
      }
      .contact {
        li {
          display: flex;
          flex-direction: row;
          padding-top: 1.2rem;
          padding-bottom: 1.2rem;
          .infoWrapper {
            a, span {
              display: block;
              color: ${props => props.theme.black};
              text-decoration: none;
            }
            span:first-child {
              font-weight: bold;
            }
          }
        }
      }
      .formWrapper {
        label {
          display: block;
          margin-bottom: 1.2rem;
        }
        input {
          margin-bottom: 1.2rem;
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          font-size: inherit;
          padding: 6px 12px;
          vertical-align: middle;
          background-color: transparent;
          border: 1px solid ${props => props.theme.black};
        }
        button {
          background: ${props => props.theme.black};
          border: none;
          color: white;
          text-transform: uppercase;
          font-size: inherit;
          padding: 1.2rem;
        }
      }
      .externalLinks {
        list-style-type: circle;
        list-style-position: inside;
        li {
          display: list-item;
        }
      }
      .socialMedia {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        a {
          display: content;
          .icon {
            margin-right: 0 !important;
          } 
        }
      }
    }
    .footerBox:last-child {
      margin-bottom: 0;
    }
  }
  @media (hover: hover) {
    .externalLinks {
      li:hover {
        color: green !important;
      }
    }
  }
  @media (min-width: 920px) {
    .footerWrapper {
      grid-template-columns: repeat(4, 25%);
      .footerBox {
        margin-right: 1.6rem;
        margin-bottom: 0;
      }
      .footerBox:last-child {
        margin-right: 0;
      }
    }
  }
`;

function Footer() {
  const [email, setEmail] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function suscribe(e) {
    alert('Mail suscripto ' + email);
    e.preventDefault();
  }

  return (
    <Foot>
      <div className='footerWrapper'>
        <div className='footerBox'>
          <div className='boxTitle'>
            <span>Contacto</span>
          </div>
          <ul className='contact'>
            <li>
              <div className='icon'>
                <img src={process.env.PUBLIC_URL + '/icons/contact/location.svg'} alt='Dirección'></img>
              </div>
              <div className='infoWrapper'>
                <span>Dirección:</span>
                <span>Castillo 1486, Buenos Aires, Argentina</span>
              </div>
            </li>
            <li>
              <div className='icon'>
                <img src={process.env.PUBLIC_URL + '/icons/contact/phone.svg'} alt='Teléfono'></img>
              </div>
              <div className='infoWrapper'>
                <span>Teléfono:</span>
                <span>54 11 4587 7440</span>
              </div>
            </li>
            <li>
              <div className='icon'>
                <img src={process.env.PUBLIC_URL + '/icons/contact/email.svg'} alt='Email'></img>
              </div>
              <div className='infoWrapper'>
                <span>Email:</span>
                <a href='info@cajanegraeditora.com.ar'>info@cajanegraeditora.com.ar</a>
              </div>
            </li>
          </ul>
        </div>
        <div className='footerBox'>
          <div className='boxTitle'>
            <span>Suscribite al newsletter</span>
          </div>
          <div className='formWrapper'>
            <form onSubmit={suscribe}>
              <label for='email'>Correo electrónico (obligatorio)</label>
              <input type='email' value={email} onChange={handleEmail} name='email'></input>
              <button type='submit'>Enviar</button>
            </form>
          </div>
        </div>
        <div className='footerBox'>
          <div className='boxTitle'>
            <span>Links</span>
          </div>
          <ul className='externalLinks'>
            <li><Link className='link' to='/'>Compra Online</Link></li>
            <li><Link className='link' to='/'>Contacto</Link></li>
            <li><Link className='link' to='/'>Distribución</Link></li>
            <li><Link className='link' to='/'>Términos y condiciones</Link></li>
            <li><Link className='link' to='/'>Politicas de seguridad</Link></li>
            <li><Link className='link' to='/'>Politicas de reembolso</Link></li>
          </ul>
        </div>
        <div className='footerBox'>
          <div className='boxTitle'>
            <span>Redes Sociales</span>
          </div>
          <ul className='socialMedia'>
            <li>
              <a href='/'>
                <div className='icon'>
                  <img src={process.env.PUBLIC_URL + '/icons/media/twitter.svg'} alt='Twitter'></img>
                </div>
              </a>
            </li>
            <li>
              <a href='/'>
                <div className='icon'>
                  <img src={process.env.PUBLIC_URL + '/icons/media/instagram.svg'} alt='Instagram'></img>
                </div>
              </a>
            </li>
            <li>
              <a href='/'>
                <div className='icon'>
                  <img src={process.env.PUBLIC_URL + '/icons/media/facebook.svg'} alt='Facebook'></img>
                </div>
              </a>
            </li>
            <li>
              <a href='/'>
                <div className='icon'>
                  <img src={process.env.PUBLIC_URL + '/icons/media/youtube.svg'} alt='Youtube'></img>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Foot>
  );
}

export default Footer;