import styled from 'styled-components';
import { defaultTextColor } from 'ui/styles/colors';

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

    font-size: 16px;

    color: ${defaultTextColor};
  }

  &:last-child {
    margin-right:0;
  }
`;