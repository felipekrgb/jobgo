import styled from 'styled-components';

export const ContainerConteudo = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    width: 30%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;

    &:hover {
      svg,
      h1,
      p {
        transform: scale(1.2);
      }
    }

    & + a {
      border-left: 1px solid #a6a6a6;
    }

    svg {
      margin-bottom: 16px;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        width: 80%;
        text-align: center;
        margin-top: 3%;
      }
    }

    p,
    h1,
    svg {
      transition: 0.5s ease;
    }
  }
`;
