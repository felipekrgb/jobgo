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

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5%;
    margin-top: 2%;
    margin-left: 2%;
    padding-right: 6%;
    margin-bottom: 1%;

    .voltar {
      display: flex;
      height: 100%;
      align-items: center;

      button {
        border: 0;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }

    .paginacao {
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: flex-end;
      align-items: center;

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
  }

  section {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 8% 6% 0 6%;

    a {
      background: #fff;
      border-radius: 5px;
      width: 100%;
      height: 73px;
      padding: 24px;
      display: block;
      text-decoration: none;

      display: flex;
      align-items: center;
      transition: transform 0.2s;

      & + a {
        margin-top: 2%;
      }

      &:hover {
        transform: translateX(10px);
      }

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      div {
        margin: 0 16px;
        flex: 1;

        strong {
          font-size: 20px;
          color: #3d3d4d;
        }
      }

      svg {
        margin-left: auto;
        color: #cbcbd6;
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
