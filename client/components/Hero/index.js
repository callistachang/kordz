import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  LinkOverlay,
  IconProps,
  Icon,
} from "@chakra-ui/react";

export default function JoinOurTeam() {
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"6xl"}
        align={"center"}
        // columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 36 }}
      >
        <Stack spacing={{ base: 10, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
          >
            Own your{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, #9d6feb,#6c41b9)"
              bgClip="text"
            >
              music.
            </Text>
          </Heading>
          <Text
            as={"span"}
            fontSize={{ base: "1xl", sm: "1xl", md: "2xl", lg: "2xl" }}
            bgGradient="linear(to-r, purple.500, purple.800)"
            bgClip="text"
          >
            Kordz (Beta) connects creators and fans in a decentralized way on
            the cheap and blazing-fast Polygon network. Discover and collect
            digital collectibles on a platform made by musicians, built for
            musicians.
          </Text>
          <Text
            as={"span"}
            fontSize={{ base: "1xl", sm: "1xl", md: "1.5xl", lg: "1.5xl" }}
            bgGradient="linear(to-r, gray.500, gray.800)"
            bgClip="text"
          >
            View our smart contract on the Mumbai testnet here:{" "}
            <a
              href="https://mumbai.polygonscan.com/address/0x583ADc8C133fdaCEd2546c0348a5AB4aA7B5BBd6"
              target="_blank"
            >
              https://mumbai.polygonscan.com/address/0x583ADc8C133fdaCEd2546c0348a5AB4aA7B5BBd6
            </a>{" "}
            // Note: Kordz (Beta) is currently under construction, and not all
            features may be functional.
          </Text>
          <Stack
            flex={{ base: 1, md: 0 }}
            direction={"row"}
            spacing={6}
            justify={"center"}
          >
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"xl"}
              fontWeight={600}
              color={"white"}
              bgGradient="linear(to-r, #9d6feb,#6c41b9)"
              // bg={"#9d6feb"}
              href="/items"
              size="lg"
              _hover={{
                bg: "pink.300",
              }}
            >
              <LinkOverlay href="/items">Go to Marketplace</LinkOverlay>
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: -1 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
