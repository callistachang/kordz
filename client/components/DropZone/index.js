import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Center, useColorModeValue, Icon } from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";

const DropZone = ({ onFileUploaded, accept, name }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    maxFiles: 1,
    multiple: false,
  });

  // const dropText = isDragActive
  //   ? "Drop the files here..."
  //   : "Drag and drop files here, or click to select files...";

  const dropText =
    name == "audio"
      ? "🎶 Drop your audio file here (MP3, WAV, etc...)"
      : "📷 Drop your song cover here (PNG, JPEG, etc...)";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} name={name} accept={accept} />
      {name == "audio" && selectedFileUrl && (
        <ReactAudioPlayer src={selectedFileUrl} controls />
      )}
      {name == "image" && selectedFileUrl && (
        <img src={selectedFileUrl} alt="Point thumbnail" />
      )}
      {!selectedFileUrl && (
        <Center
          py={120}
          cursor="pointer"
          bg={isDragActive ? activeBg : "transparent"}
          _hover={{ bg: activeBg }}
          transition="background-color 0.2s ease"
          borderRadius={4}
          border="3px dashed"
          borderColor={borderColor}
        >
          <p>{dropText}</p>
        </Center>
      )}
    </div>
  );
};

export default DropZone;
