
import styled, {css} from "styled-components";

const subColor = 'grey';
const mainColor= 'black';

export const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`

export const FormInputLabel = styled.label`
    position: absolute;
    left: 5px;
    top: 10px;
    font-size: 16px;
    color: ${subColor};
    transition: 300ms ease all;

    ${({shrink}) => shrink && shrinkLabelStyles};  
`;

export const FormInputStyle = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid ${mainColor};
    width: 100%;
    padding: 10px 10px 10px 5px;
    outline: none;
    font-size: 18px;
    margin: 25px 0;
    color: ${subColor};
    display: block;

    &:focus ~ ${FormInputLabel}{
      ${shrinkLabelStyles};
    }
`;

export const Group = styled.div`
  position: relative;
`


