import { ReactNode } from "react";
import styled from "styled-components";

type FullWidthLayoutProps = {
  children: ReactNode;
};

const RootContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
`;
const Header = styled.header`
  background-color: peachpuff;
  height: 70px;
  padding: 1em 1em 0;
`;
const MainContainer = styled.main`
  flex: 1;
  padding: 1em;
`;
const Footer = styled.footer`
  height: 50px;
  background-color: dimgrey;
  color: white;
  padding: 1em 1em 0;
`;

export const FullWidthLayout = ({ children }: FullWidthLayoutProps) => {
  return (
    <RootContainer>
      <Header>header</Header>
      <MainContainer>{children}</MainContainer>
      <Footer>footer</Footer>
    </RootContainer>
  );
};