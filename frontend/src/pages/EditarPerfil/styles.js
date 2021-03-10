import styled from 'styled-components';
import { shade } from 'polished';

export const ContainerConteudo = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    height: 100%;
    padding: 2%;
    margin-left: 2%;
    border: 1px solid #a6a6a6;
    border-radius: 10px;
    color: white;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    hr {
      margin: 1% 0 1% 0;
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
    margin-left: 1%;
    margin-top: 0;
  }

  .pdf {
    width: 90%;
    height: 100%;
    margin-right: 2%;

    display: flex;
    align-items: center;
    justify-content: center;

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
        margin-right: 2.5%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        background: ${shade(0.2, '#007bff')};
      }
    }

    label {
      width: 90%;
      height: 56px;
      margin-top: 16px;
      margin-right: 2%;
      background: #007bff;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 500;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: background-color 0.2s;

      input {
        display: none;
      }

      svg {
        color: white;
        margin-right: 2.5%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        background: ${shade(0.2, '#007bff')};
      }
    }
  }
`;
