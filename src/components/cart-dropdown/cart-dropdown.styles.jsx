import styled from 'styled-components';
import { BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles';


export const HideOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(0);
  transition: transform 1ms ease;

  ${({showOverlay}) => showOverlay && `
  backdrop-filter: blur(10px);
  transform: scale(1);
  `}
`


export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.5);
  background-color: white;
  border-radius: 5px;
  top: 90px;
  right: 40px;
  z-index: 5;
  transform: scale(0);
  transition: transform 500ms ease;

  ${({showDropdown}) => showDropdown && `
  transform: scale(1);
  `}

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton}{
    width: 100%;
  }

`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  display: block;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CartItems = styled.div`
    height: 270px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`


