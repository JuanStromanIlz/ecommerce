import Checkout from '../styled-components/Checkout';
import PageWrapper from '../styled-components/PageWrapper';
import { useEffect } from 'react';

function CheckoutView() {

  useEffect(()=> {
    window.document.title= 'Checkout';
  }, []);

  return (
    <PageWrapper>
      <Checkout />
    </PageWrapper>
  );
}

export default CheckoutView;