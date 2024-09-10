import styled, { css } from 'styled-components';
import { space, color, typography } from 'styled-system';

export const Container = styled.div`
  ${space}
  ${color}
  ${typography}
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  overflow-y:hidden;
`;

export const Form = styled.form`
  ${space}
  ${color}
  ${typography}
  background: #fff;
  padding-right: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display:flex;
  flex-direction:column;
  align-items:center;
  width:600px;
`;

export const Input = styled.input`
  ${space}
  ${color}
  ${typography}
  width: 80%;
  margin:auto;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  ${space}
  ${color}
  ${typography}
  width: 200px;
  padding: 0.8rem;
  border: none;
  margin-bottom:20px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
   gap:20px;
`;

// Importing isPropValid from emotion for prop validation
import isPropValid from '@emotion/is-prop-valid';

export const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'show'
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const BlurContent = styled.div`
  ${({ blur }) =>
    blur === 'true' &&
    css`
      filter: blur(5px);
      transition: filter 0.3s ease;
    `}
`;