import { Button, Flex, Input } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { logIn } from '../api';
import { useAuth } from '../hooks';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Loader } from '../components';

export default function LoginPage() {
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token, user, setTokenAndUser } = useAuth();
  useEffect(() => {
    if (user && token) {
      axios.defaults.headers['x-access-token'] = token;
      navigate('/home');
    }
    return () => {};
  }, [token, navigate, user]);
  return (
    <Flex h='100vh' flexDir='row' justifyContent='center' alignItems='center'>
      <Flex
        flexDir='column'
        p={10}
        border='1px solid lightblue'
        bg='linear-gradient(to bottom right, blue , skyblue)'
        borderRadius='10'>
        <Input bg='white' placeholder='Email' my={2} ref={emailRef} type='email' />
        <Input bg='white' placeholder='********' mb={2} ref={passRef} type='password' />
        {loading ? (
          <Loader />
        ) : (
          <Button
            disabled={loading}
            variant='solid'
            bg='lightgreen'
            onClick={async () => {
              setLoading(true);
              const data = await logIn(emailRef.current?.value, passRef.current?.value);
              if (data.token && data.user) {
                setTokenAndUser(data.token, data.user);
                navigate('/home');
              } else {
                setLoading(false);
              }
            }}>
            Login
          </Button>
        )}
        <Button bg='white' mt={2} variant='outline' onClick={() => navigate('/signup')}>
          SignUp
        </Button>
      </Flex>
    </Flex>
  );
}
