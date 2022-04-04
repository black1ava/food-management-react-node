import React from 'react';
import { Card, Loading, Frame } from '@shopify/polaris';

function LoadingPage(){
  return(
    <Frame>
      <Loading />
      <div className="center">
        <div className="w-40">
          <Card title="Food managment app" sectioned>
            <p>This page is loading. Please be patient...</p>
          </Card>
        </div>
      </div>
    </Frame>
  );
}

export default LoadingPage;