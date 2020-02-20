import React from 'react';
import './nav.style.css';

interface NavProps extends React.HTMLAttributes<HTMLElement> { }
 
const Nav: React.SFC<NavProps> = ({ children, ...rest }) => {
  return <nav {...rest} className={'container'} id={'nav'}>{children}</nav>;
}
 
export default Nav;
