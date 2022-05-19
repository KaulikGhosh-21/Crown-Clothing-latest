import styled from "styled-components";

import {ReactComponent as ShoppingBagIcon} from "../../assets/shopping-bag.svg";

export const ShoppingIcon = styled(ShoppingBagIcon)`
    width: 24px;
    height: 24px;
    transition: transform 500ms ease;
`

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({cartIsOpen}) => cartIsOpen && `
    z-index: 5;
    
    ${ShoppingIcon}{
      transform: scale(1.5);
    }
  `}
`

export const ItemCount = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
`


