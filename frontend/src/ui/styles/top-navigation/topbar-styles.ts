import styled from 'styled-components';

export const Navigation = styled.nav`

`;

export const NavigationList = styled.ul`
  display:flex;
  flex-wrap:wrap;

  padding:0;
  margin:0;

  list-style:none;
`;

export const NavigationItem = styled.li`
  margin-right:10px;

  a {
    text-decoration:none;
  }

  &:last-child {
    margin-right:0;
  }
`;