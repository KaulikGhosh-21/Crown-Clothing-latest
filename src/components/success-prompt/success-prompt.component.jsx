import React from 'react';

import { 
  HideOverlayContainer,
    SuccessContainer, 
    SuccessIconContainer, 
    SuccessMessage 
} from './success-prompt.styles';


export const SuccessPrompt = ({children}) => {
  return (
    <HideOverlayContainer>
      <SuccessContainer>
          <SuccessIconContainer />
          <SuccessMessage>{children}</SuccessMessage>
      </SuccessContainer>
    </HideOverlayContainer>
  )
}
