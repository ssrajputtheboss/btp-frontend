import './App.css';
import { RouterPage } from './pages';
import { Center, ChakraProvider, Heading } from '@chakra-ui/react';
function App() {
  return (
    <ChakraProvider>
      <Center>
        <Heading m={5} color='teal'>
          Video Summary Maker
        </Heading>
      </Center>
      <RouterPage />
    </ChakraProvider>
  );
}

export default App;
