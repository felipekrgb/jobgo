import styled from 'styled-components';

export const ContainerConteudo = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    height: 60%;
    padding: 2%;
    margin-left: 2%;
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
        width: 60%;
      }

      input {
        margin-right: 4.5%;
      }
    }
  }
`;
