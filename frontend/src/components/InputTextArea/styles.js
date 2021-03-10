import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  height: 120px;

  border: 2px solid #b7b7b7;
  color: #656565;

  display: flex;

  & + div {
    margin-top: 8px;
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

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: black;
    font-size: 16px;
    font-family: Roboto, sans-serif;
    resize: none;

    &::placeholder {
      color: #888;
    }
  }

  svg {
    margin-right: 16px;
    align-self: center;
  }
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
