import styled from 'styled-components';

export const Container = styled.div`
  svg {
    fill: ${props =>
      props.children.props.children.props.scroll
        ? '#fff'
        : props.children.props.children.props.colorlogo};
    height: 64px;
  }
`;
