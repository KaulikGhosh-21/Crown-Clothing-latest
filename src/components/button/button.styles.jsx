import styled from 'styled-components';

import { SpinnerContainer } from "../spinner/spinner.styles";


export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  border: none;
  background-color: black;
  color: white;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  outline: none;
  padding: 0 35px 0 35px;
  cursor: pointer;

  &:hover{
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
    color: white;

    &:hover{
      background-color: #357ae8;
      color: white;
      border: none;
    }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover{
    background-color: black;
    color: white;
    border: none;
  }
`

export const SpinnerButton = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`

