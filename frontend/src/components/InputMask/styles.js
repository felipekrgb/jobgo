import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid rgba(0, 0, 0, 0.9);
  color: #656565;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #656565;
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #007bff;
      border-color: #007bff;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #007bff;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span {
    background-color: #c53030;
    color: white;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
