import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  Wrap,
  WrapItem,
  useDisclosure
} from '@chakra-ui/react';
import { useAuth } from '../hooks';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { MdLogout, MdUpload } from 'react-icons/md';
import { ENDPOINT, getSummaries, getUploads, uploadFile } from '../api';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '../components';

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, user, signOut } = useAuth();
  const [summaries, setSummaries] = useState();
  const [uploads, setUploads] = useState();
  const fileRef = useRef();
  const [sigma, setSigma] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(user && token)) {
      navigate('/login');
    } else {
      axios.defaults.headers['x-access-token'] = token;
    }
    return () => {};
  }, [token, navigate, user]);

  useEffect(() => {
    if (user && token) {
      getSummaries()
        .then((summaries) => setSummaries(summaries))
        .catch((e) => console.log(e));
      getUploads()
        .then((uploads) => setUploads(uploads))
        .catch((e) => console.log(e));
    }

    return () => {};
  }, [token, user]);

  const queued = [];
  if (uploads && summaries) {
    for (let up of uploads) {
      if (!summaries.includes(up)) {
        queued.push(up);
      }
    }
  }

  console.log(queued, uploads, summaries);

  function upload() {
    let data = new FormData();
    if (!fileRef.current?.files[0]) {
      return alert('No File Selected');
    }
    data.append('file', fileRef.current?.files[0], fileRef.current?.files[0].name);
    data.append('sigma', sigma);
    uploadFile(data)
      .then((r) => onClose())
      .catch((e) => e);
  }

  return (
    <Flex flexDir='column' h='100%' w='100%'>
      <Flex p={10} justifyContent='space-between' alignItems='center'>
        <Heading> Hello, {user?.name}</Heading>
        <Tooltip label='Sign Out'>
          <IconButton
            onClick={(e) => {
              signOut();
            }}
            icon={<MdLogout />}
            bg='red'></IconButton>
        </Tooltip>
      </Flex>
      {!summaries ? (
        <></>
      ) : summaries.length > 0 ? (
        <Text as='b' mx={10} my={3}>
          Your Video Summaries
        </Text>
      ) : (
        <Text as='b' mx={10} my={3}>
          No videos to show 🥲, upload a video to generate it's summary
        </Text>
      )}
      {summaries && <Divider />}
      <Wrap m={5} spacing={8} p={2} maxW='95%' borderRadius={3}>
        {summaries?.map((e, i) => (
          <WrapItem
            display='flex'
            flexDir='column'
            justifyContent='space-between'
            alignItems='center'
            width='400px'
            borderRadius='lg'
            boxShadow='inner'
            p={5}
            key={'video' + i}>
            <video
              style={{ borderRadius: '10px' }}
              height='180px'
              autoPlay={false}
              controls='controls'>
              <source src={`${ENDPOINT}/video/${e}?token=${token}`} type='video/mp4'></source>
            </video>
            <Text
              mt={3}
              mb={1}
              display='inline-block'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              textAlign='center'
              size='sm'
              width='300px'
              fontWeight='bold'>
              {e}
            </Text>
          </WrapItem>
        ))}
      </Wrap>
      {queued.length > 0 && (
        <Text as='b' mx={10} my={3}>
          {' '}
          Queued videos
        </Text>
      )}
      <Wrap m={5} spacing={8} p={2} maxW='90%' borderRadius={3}>
        {queued?.map((e, i) => (
          <WrapItem
            display='flex'
            flexDir='column'
            justifyContent='space-between'
            alignItems='center'
            width='400px'
            borderRadius='lg'
            boxShadow='inner'
            p={5}
            key={'queued' + i}>
            <Loader />
            <Text
              mt={3}
              mb={1}
              display='inline-block'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
              textAlign='center'
              size='sm'
              width='300px'
              fontWeight='bold'>
              {e}
            </Text>
          </WrapItem>
        ))}
      </Wrap>
      {!isOpen && (
        <Tooltip label='Upload Video'>
          <IconButton
            icon={<MdUpload />}
            position='fixed'
            right='10'
            bottom='10'
            onClick={(e) => onOpen()}></IconButton>
        </Tooltip>
      )}
      <Modal size='sm' isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justifyContent='space-between' display='flex'>
            Upload New Video
            <ModalCloseButton position='relative' bg='red' />
          </ModalHeader>
          <ModalBody alignSelf='center' m={5} p={5} borderRadius={10}>
            <Input mb={5} ref={fileRef} type='file' accept='video/mp4' required />
            <Text>Choose Summary Percentage</Text>
            <Slider value={sigma} step={1} onChange={(e) => setSigma(e)}>
              <SliderMark
                value={5}
                {...{
                  mt: '2',
                  ml: '-2.5',
                  fontSize: 'sm'
                }}>
                5%
              </SliderMark>
              <SliderMark
                value={100}
                {...{
                  mt: '2',
                  ml: '-2.5',
                  fontSize: 'sm'
                }}>
                100%
              </SliderMark>
              <SliderMark
                value={sigma}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-10'
                ml='-5'
                w='12'>
                {sigma}%
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ModalBody>
          <ModalFooter display='flex' flexDir='column'>
            <Button
              disabled={!fileRef.current || !fileRef.current.files.length === 0}
              mb={2}
              variant='solid'
              onClick={(e) => upload()}>
              Generate Summary
            </Button>
            <Text fontSize='smaller' color='gray'>
              Your video will be uploaded and queued for summary generation
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
