import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  padding: 8%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h1 {
    text-align: center;
  }

  p {
    width: 90%;
    text-align: center;
    padding: 2% 0;
    border-top: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
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
  }
`;

export const AvatarInput = styled.div`
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 2px solid #007bff;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #007bff;
    border: 0;
    border-radius: 50%;
    cursor: pointer;

    bottom: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      color: white;
    }

    &:hover {
      background: ${shade(0.2, '#007bff')};
    }
  }
`;
