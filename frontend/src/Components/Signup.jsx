import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";


export default function Signup() {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const toast = useToast();

    //   all data states
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const submitHandler = async () => {

        if (!userName || !email || !password || !confirmpassword) { //agar blank hai toh error de dega
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (password !== confirmpassword) {     //password validation
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }
        console.log(userName, email, password);
        try {
            const config = {    //api request to send data
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:8000/api/auth/signup",
                {
                    userName,
                    email,
                    password
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful Now You Can Login",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
            setUserName("");
            setEmail("");
            setPassword("");
            setConfirmpassword("");

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom",
            });
        }
    };





    return (
        <VStack spacing="5px">
            <FormControl id="first-name" border={"black"} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" border={"black"} isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup border={"black"} size="md">
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

