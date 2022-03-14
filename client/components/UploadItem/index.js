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
  Textarea,
} from "@chakra-ui/react";
import DropZone from "../DropZone";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
var FormData = require("form-data");
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import { getTokenContract } from "../../utils/state";
import { ethers } from "ethers";

export default function UploadItem({ tokenContract, marketplaceContract }) {
  const { account, library, chainId } = useWeb3React();
  const router = useRouter();

  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedSong, setUploadedSong] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  function handleInputChange(event) {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function uploadMetadataToServer(tokenId) {
    try {
      const data = new FormData();
      console.log(formData);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (uploadedFile) {
        data.append("image", uploadedFile);
      }
      data.append("id", tokenId);
      data.append("seller", account);
      const metadataURI = await api.post("/upload", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      console.log(
        "Metadata URI: " + JSON.stringify(metadataURI.data.metadataURI)
      );
      return metadataURI.data.metadataURI;
    } catch (error) {
      console.log(error);
    }
  }

  async function mintNFT(metadataURI, tokenId) {
    try {
      const data = new FormData();
      const tx1 = await tokenContract.mint(metadataURI);
      data.append("hash", tx1["hash"]);
      await api.post(`/update/${tokenId}`, data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      console.log("Minted NFT: " + JSON.stringify(tx1));
      const tx2 = await marketplaceContract.putItemForSale(
        tokenId,
        ethers.utils.parseEther(formData.price)
      );
      console.log("NFT put up for sale:" + JSON.stringify(tx2));
    } catch (error) {
      console.log("Error while minting: " + error);
    }
  }

  async function uploadNewNFT(event) {
    event.preventDefault();

    const tokenId = await tokenContract.maxSupply();
    console.log("Max supply: " + tokenId);
    const metadataURI = await uploadMetadataToServer(tokenId);
    await mintNFT(metadataURI, tokenId);
    router.push("/");
  }

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"6xl"}
        align={"center"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 28 }}
      >
        <Stack>
          <DropZone
            onFileUploaded={setUploadedFile}
            accept="image/*"
            name="image"
          />
          <DropZone
            onFileUploaded={setUploadedSong}
            accept="audio/*"
            name="audio"
          />
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Create A{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, #9d6feb,#6c41b9)"
                bgClip="text"
              >
                Collectible
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Thank you for creating with Kordz (Beta)!
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Title"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                onChange={handleInputChange}
                name="title"
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Textarea
                placeholder="Description"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                name="description"
                onChange={handleInputChange}
                _placeholder={{
                  color: "gray.500",
                }}
                rows={8}
              />
              <Input
                placeholder="Price (MATIC)"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                name="price"
                onChange={handleInputChange}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, #9d6feb,#6c41b9)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, #9d6feb,#6c41b9)",
                boxShadow: "xl",
              }}
              onClick={uploadNewNFT}
            >
              Submit
            </Button>
          </Box>
          form
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
