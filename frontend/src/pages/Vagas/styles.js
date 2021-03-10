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

  .paginacao {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    }
  }

  section {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    a {
      width: 20%;
      height: 45%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      padding: 1.5%;
      margin: 0 2%;
      border: 1px solid #a6a6a6;
      border-radius: 10px;

      img {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        margin-bottom: 4%;
        border: 2px solid #007bff;
      }

      h1 {
        font-size: 1.2em;
        color: black;
        text-align: center;
        margin-bottom: 5%;
      }

      h2 {
        font-size: 1.2em;
        padding: 1% 0;
        border-top: 1px solid #c9c9c9;
        border-bottom: 1px solid #c9c9c9;
        color: #007bff;
        width: 100%;
        text-align: center;
      }

      p {
        color: black;
        text-align: center;
      }
    }
  }

  ${props =>
    props.loading &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;
