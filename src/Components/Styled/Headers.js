/** @jsx jsx */
import { jsx } from 'theme-ui';
import { color } from 'styled-system';

const Container = ({ children, ...props }) => (
  <div
    {...props}
    sx={{
      maxWidth: 'container',
      mx: 'auto',
      px: 3,
    }}
  >
    {children}
  </div>
);

export const Header = ({ children, ...props }) => (
  <header
    {...props}
    sx={{
      width: '100%',
      variant: 'layout.header',
    }}
  >
    <Container>{children}</Container>
  </header>
);

export const Main = ({ children, ...props }) => (
  <main
    {...props}
    sx={{
      width: '100%',
      flex: '1 1 auto',
      variant: 'layout.main',
    }}
  >
    <Container>{children}</Container>
  </main>
);

export const Footer = ({ children, ...props }) => (
  <footer
    sx={{
      width: '100%',
      variant: 'layout.footer',
    }}
  >
    <Container>Footer</Container>
  </footer>
);

export default (props) => (
  <div
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      variant: 'layout.root',
    }}
  >
    <Header>Header Content</Header>

    <Main>Main Content</Main>

    <Footer>Footer Content</Footer>
  </div>
);
