import styled, { keyframes, css } from 'styled-components';

import { shade } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background-color: #007bff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: white;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${shade(0.2, '#007bff')};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[disabled]:hover {
    background-color: #007bff;
  }

  ${props =>
    props.isCandidato &&
    css`
      visibility: hidden;
    `}

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
