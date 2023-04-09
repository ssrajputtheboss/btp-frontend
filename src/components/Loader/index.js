import { Center } from '@chakra-ui/react';
import './index.css';

export function Loader() {
  return (
    <Center>
      <div className='lds-grid'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Center>
  );
}
