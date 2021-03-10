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

  padding: 100px 64px 64px 64px;

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
  flex-direction: column;
  justify-content: center;

  form {
    width: 100%;
    padding: 1.5% 2.5%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

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

export const Linha = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 8px;

  div {
    margin: 0;
  }

  div + div {
    margin-left: 8px;
  }

  p {
    color: ${shade(0.4, '#fff')};
  }
`;

export const Titulo = styled.div`
  width: 100%;

  background-color: rgba(0, 0, 0, 0.7);
  color: white;

  border-radius: 10px;
  margin-bottom: 1%;
  padding: 1% 2.5%;

  display: flex;
  align-items: center;

  h1 {
    margin-right: 5%;
  }

  div {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

export const BotaoOpcao = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px solid;
  border-color: ${props => (props.selected ? '#007bff' : '#fff')};
  border-radius: 10px;
  margin: 0 0.5% 0 0.5%;
  background-color: transparent;
  padding: 0.2%;
  transition: background-color 0.2s;

  svg {
    fill: ${props => (props.selected ? '#007bff' : '#fff')};
    margin-right: 4%;
    transition: fill 0.2s;
  }

  p {
    color: white;
    font-size: 1.2em;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);

    svg {
      fill: #007bff;
    }
  }
`;
