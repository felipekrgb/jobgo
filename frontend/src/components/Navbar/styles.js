import styled from 'styled-components';

export const Container = styled.nav`
  background-color: ${props => (props.scroll ? 'transparent' : props.color)};
  padding: 0.5% 5%;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;

  display: flex;

  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: 0;

    svg {
      color: white;
    }
  }

  transition: background-color 0.2s ease;
`;
