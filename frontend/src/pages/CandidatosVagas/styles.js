import styled from 'styled-components';

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

      & + button {
        margin-left: 1.5%;
      }
    }
  }

  section {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 6% 6% 0 6%;

    a {
      background: #fff;
      border-radius: 5px;
      width: 100%;
      height: 72px;
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

        p {
          font-size: 18px;
          color: #a8a8b3;
          margin-top: 4px;
        }
      }

      svg {
        margin-left: auto;
        color: #cbcbd6;
      }
    }
  }
`;
