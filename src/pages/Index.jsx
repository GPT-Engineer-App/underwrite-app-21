import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, FormControl, FormLabel, useToast, Heading, Text, InputGroup, InputRightElement, IconButton, Divider } from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://backengine-7vsq.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to sign up.");
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-7vsq.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.accessToken) {
        setAccessToken(data.accessToken);
        window.location.href = "/policies";
      } else {
        throw new Error(data.error || "Failed to log in.");
      }
    } catch (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="stretch">
          <Heading>Welcome to the Insurance Underwriting App</Heading>
          <Text>Please sign up or log in to continue.</Text>

          <Divider />

          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement>
                <IconButton icon={showPassword ? <FaEyeSlash /> : <FaEye />} onClick={togglePasswordVisibility} variant="ghost" />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button leftIcon={<FaUserPlus />} colorScheme="blue" onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button leftIcon={<FaSignInAlt />} colorScheme="teal" onClick={handleLogin}>
            Log In
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
