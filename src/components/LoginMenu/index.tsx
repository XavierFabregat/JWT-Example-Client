import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { CgLogIn } from 'react-icons/cg';
import { BiUserPlus } from 'react-icons/bi';

interface Props {

}

export const LoginMenu: React.FC<Props> = () => {

  const navigate = useNavigate();

  return (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Login"
      icon={<AiOutlineMenu />}
      variant="outline"
    />
    <MenuList>
      <MenuItem icon={<CgLogIn size={"25px"} fontWeight={"bold"}/>} onClick={() => {
        navigate('/login')
      }}>
       Login
      </MenuItem>
      <MenuItem icon={<BiUserPlus size={"25px"} fontWeight={"bold"}/>} onClick={() => {
        navigate('/register')
      }}>
        <Link to="/register">Register</Link>
      </MenuItem>
    </MenuList>
  </Menu>
  );
}