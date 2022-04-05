import React from 'react';
import { Modal, Spinner } from '@shopify/polaris';

function SigninLoading(props){
  return(
    <Modal
      open={ props.open }
      title="Signing in you in..."
    >
      <Modal.Section>
        <Spinner />
      </Modal.Section>
    </Modal>
  );
}

export default SigninLoading;