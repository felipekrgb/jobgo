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

export const ContainerComecar = styled.div`
  background-color: #007bff;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    color: #fff;
  }

  hr {
    width: 30%;
    color: #fff;
    border: 1px solid #fff;
    max-width: 3.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 0;
    box-sizing: content-box;
  }

  p {
    color: #fff;
    margin-bottom: 1.5rem;
  }

  a {
    color: #fff;
    background-color: transparent;
    border: 1px solid;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
      color: #000;
      font-weight: bold;
      background-color: #fff;
      border-color: #fff;
    }
  }
`;

export const ContainerServicos = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  svg {
    fill: #007bff;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  p {
    text-align: center;
    width: 70%;
  }

  hr {
    width: 30%;
    border: 1px solid #007bff;
    color: #007bff;
    width: 3.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    box-sizing: content-box;
  }
`;

export const ContainerContato = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 3.5%;

  hr {
    width: 30%;
    color: #fff;
    border: 1px solid #fff;
    max-width: 3.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 0;
    box-sizing: content-box;
  }

  div {
    margin-top: 2%;
    display: flex;
    justify-content: center;
    align-items: center;

    a + a {
      margin-left: 50%;
    }

    svg {
      fill: #fff;
    }
  }
`;

export const ContainerApoiadores = styled.div`
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  hr {
    width: 30%;
    border: 1px solid #007bff;
    color: #007bff;
    width: 3.25rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    box-sizing: content-box;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 50%;
        height: 50%;
      }

      h3 {
        margin: 6% 0 2% 0;
        font-size: 1.5rem;
        text-align: center;
      }

      & + div {
        margin-left: 2%;
      }
    }
  }
`;

export const ContainerRodaPe = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5%;
  background-color: #007bff;

  div {
    margin-bottom: 0.5%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: white;
    }

    a + a {
      margin-left: 16%;
    }
  }

  h4 {
    color: white;
    font-size: 80%;
  }
`;
