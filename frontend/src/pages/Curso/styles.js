import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ContainerConteudo = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .voltar {
    margin-top: 2%;
    margin-left: 2%;
    width: 100%;
    display: flex;
    align-items: center;
    height: 5%;
    padding-right: 6%;
    margin-bottom: 1%;

    div {
      width: 2%;

      & + div {
        margin-left: 1.2%;
      }
    }

    button {
      border: 0;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 13px;
    }
  }

  section {
    width: 100%;
    height: 75%;
    padding: 2%;
    margin-left: 2%;
    margin-bottom: 5%;
    border: 1px solid #a6a6a6;
    color: black;
    border-radius: 10px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 2%;

      img {
        width: 120px;
        height: 120px;

        border-radius: 50%;
        border: 2px solid #007bff;
        margin-right: 2%;
      }

      .texto {
        display: flex;
        flex-direction: column;
        width: 100%;

        hr {
          margin-top: 1%;
        }

        h4 {
          color: #747474;
          margin-bottom: 1%;
        }
      }
    }

    .corpo {
      .descricao {
        max-width: 100%;
      }

      .informacoes {
        display: flex;
        align-items: center;
        margin-top: 5%;
      }

      .periodo {
        margin-right: 10%;
        display: flex;
        flex-direction: column;
      }

      .tipo {
        display: flex;
        flex-direction: column;
      }
    }

    a {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 56px;
      margin-top: 16px;
      background: #007bff;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      color: white;

      transition: background-color 0.2s;

      svg {
        color: white;
        margin-right: 1%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        background: ${shade(0.2, '#007bff')};
      }
    }
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
