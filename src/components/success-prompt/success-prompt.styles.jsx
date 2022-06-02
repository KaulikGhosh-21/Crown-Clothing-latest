import styled from "styled-components";

import { ReactComponent as SuccessIcon } from "../../assets/success.svg";

export const HideOverlayContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`

export const SuccessContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 15px;
    width: max-content;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`

export const SuccessIconContainer = styled(SuccessIcon)`
    width: 20px;
    height: 20px;
    margin-right: 15px;
    fill: rgb(102, 255, 51);
`
export const SuccessMessage = styled.h3`
    font-size: 14px;
`