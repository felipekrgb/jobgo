import styled, { css, keyframes } from 'styled-components';

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

  form {
    width: 100%;
    height: 60%;
    padding: 2%;
    margin-left: 2%;
    margin-bottom: 5%;
    border: 1px solid #a6a6a6;
    border-radius: 10px;
    color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      margin-bottom: 24px;
      color: black;
    }

    .linhaTempo {
      color: black;
      h3 {
        margin-right: 2%;
      }

      h4 {
        margin: 0 2% 0 2%;
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

  .radioTempo {
    width: 12%;
  }

  .radio {
    width: 70%;
    display: flex;
    margin-left: 4%;
    align-items: center;
    color: black;

    h3 {
      margin-right: 4%;
    }

    div {
      flex: 1;
      display: flex;
      align-items: center;
    }

    label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;

      & + label {
        margin-left: 8%;
        width: 55%;
      }

      input {
        margin-right: 4.5%;
      }
    }
  }
`;
