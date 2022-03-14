import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Link,
  Container,
} from "@chakra-ui/react";
// import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";

export default function ItemPreview(props) {
  const { id, seller, title, price, image, audio } = props;
  console.log("Item Preview: " + JSON.stringify(props));
  return (
    <Center py={12}>
      <Link href={`/items/${id}`}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={image}
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {seller.slice(0, 7)}...{seller.slice(-4)}
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              {title}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800}>{price}</Text>
              <Text color={"gray.600"}>MATIC</Text>
            </Stack>
            <Stack px={0} py={6}>
              <ReactAudioPlayer src={audio} controls />
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
