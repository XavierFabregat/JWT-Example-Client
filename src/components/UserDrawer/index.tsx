import React from 'react'
import { Drawer, DrawerBody, DrawerCloseButton, DrawerHeader, DrawerFooter, DrawerOverlay, DrawerContent, Button } from '@chakra-ui/react';
import { Logout } from '../Logout';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef?: React.RefObject<HTMLButtonElement>;
  data: any;
  loading: boolean;
}

export const UserDrawer: React.FC<Props> = ({ isOpen, onClose, finalFocusRef, data, loading }) => {

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>You are logged in as: {data.me.email}</div>;
  } else {
    body = <div>Not logged in</div>;
  }


  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>JWT Test</DrawerHeader>
        <DrawerBody>
          {body}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Logout />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}