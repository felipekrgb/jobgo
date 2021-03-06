import { Container } from './styles';

function Tooltip({ title, className, children }) {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

export default Tooltip;
