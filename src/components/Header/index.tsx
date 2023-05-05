import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useMeQuery } from '../../graphql/hooks';
import './styles.css'
import { UserDrawer } from '../UserDrawer';
import { useDisclosure, IconButton, Icon } from '@chakra-ui/react';
import { AiOutlineMenu, AiFillHome } from 'react-icons/ai';
import { LoginMenu } from '../LoginMenu';




export const Header: React.FC = () => {

  const { data, loading } = useMeQuery();
  const btnRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  let body: any = null;

 
  return (
    <header className='top-header'>
       <div>
          <Link to="/"><Icon as={AiFillHome} boxSize={'10'} fill={'facebook.400'}/></Link>
        </div>
        <div className='app-title'>
          JWT Test
        </div>
       {!loading && data && data.me ? null : (
          <LoginMenu />
        )}
        {!loading && data && data.me ? <>
          <IconButton onClick={onOpen} colorScheme={'facebook'} ref={btnRef} aria-label='button' as={AiOutlineMenu} size={"lg"} style={{ padding: "10px"}}/>
          <UserDrawer isOpen={isOpen} onClose={onClose} data={data} loading={loading}/>
        </> : null}
        {body}
    </header>
  );
}
