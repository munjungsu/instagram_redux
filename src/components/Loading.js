import React from 'react';

import { Audio } from  'react-loader-spinner'
const Loading = () => {
    return (
        <div>
            <Audio
    height="100"
    width="100"
    color='gray'
    ariaLabel='loading'
    
  />
        </div>
    );
};

export default Loading;