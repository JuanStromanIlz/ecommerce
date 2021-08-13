import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LogInSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
});

const LogInContainer = styled.div`
  background: ${props => props.theme.black};
  color: white;
  padding: 1.6rem;
  height: 100vh;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  .formWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    header {
      img {
        display: block;
        object-fit: contain;
        height: 55px;
      }
    }
    form {
      display: flex;
      flex-direction: column;
      margin-top: 3.2rem;
      .labelWrapper {
        margin-bottom: 1rem;
        overflow: hidden;
        label {
          position: relative;
          display: inline-block;
          text-transform: uppercase;
        }
      }
      input {
        margin-bottom: 3.2rem;
        display: inline-block;
        box-sizing: border-box;
        width: 100%;
        color: white;
        padding: .6rem;
        vertical-align: middle;
        background-color: transparent;
        outline: none;
        border-radius: 25px;
        border: 1px solid white;
      }
      input:focus {
        border: 1px solid ${props => props.theme.green};
      }
      .input__error {
        border: 1px solid ${props => props.theme.red};
        ::placeholder {
          color: ${props => props.theme.red};
        }
      }
      button {
        cursor: pointer;
        bottom: 0;
        top: 0;
        width: 100%;
        color: ${props => props.theme.black};
        font-size: 1.4rem;
        transition: all .3s;
        width: 100%;
        background: white;
        border-radius: 25px;
        border: 1px solid white;
        padding: 1.2rem;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
      }
    }
  }
  @media (hover: hover) {
    button:hover {
      border: 1px solid white !important;
      box-shadow: 0 0 10px 4px ${props => props.theme.greenTop} !important;
      background: ${props => props.theme.greenTop} !important;
      color: white !important;
    }
  }
  @media (min-width: 920px) {
    .formWrapper {
      width: 300px !important;
    }
  }
`;

function LogIn({sendForm}) {
  return (
    <LogInContainer>
      <div className='formWrapper'>
        <header>
          <img src='https://w4w7a3s7.stackpathcdn.com/wp-content/uploads/2018/10/logo.png' alt='logo'></img>
        </header>
        <Formik
          initialValues={{
            name: ''
          }}
          validationSchema={LogInSchema}
          onSubmit={(values, {resetForm}) => {
            sendForm(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='labelWrapper'>
                <label for='name'>Nombre</label>
              </div>
              <Field className={`${errors.name && touched.name ? 'input__error' : null}`} name='name' placeholder={errors.email && touched.email ? errors.email : null} />
              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </LogInContainer>
  );
}

export default LogIn;