import styled from 'styled-components';

import { shade } from 'polished';

import loginBackground from '../../assets/loginBackground.jpg';

export const Container = styled.div`
  height: 100vh;
  max-width: 100vw;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;

  padding: 148px;

  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url(${loginBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 42%;
    padding: 64px 48px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #fff;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: ${shade(0.2, '#007bff')};
      }

      & + a {
        color: #007bff;
        display: flex;
        align-items: center;

        svg {
          margin-right: 4px;
        }
      }
    }
  }
`;
