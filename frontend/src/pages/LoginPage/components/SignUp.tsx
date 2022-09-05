import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    useToast,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";

import { useState } from "react";

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export const SignUp = () => {
    const [password, setPassword] = useState("");
    const toast = useToast();

    type FormValues = {
        username: string;
        email: string;
        password: string;
        passwordAgain: string;
    };

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordAgain: "",
        },
    });

    const onSubmitHandler = async (values: FormValues) => {
        const { username, email, password } = values;
        console.log(username, email, password);
        try {
            await new Promise(r => setTimeout(r, 1000));
            // throw new Error("Oops");
            // Redirect to next page
        } catch (e) {
            console.log("Catch async error");
            toast({
                title: "Something went wrong, please try again",
                status: "error",
                isClosable: true,
            });
        }
    };

    const isInvalid = (field: string) => {
        if (errors[field]) {
            return true;
        }
        return false;
    };

    // Might not be necessary
    const onErrorHandler = (errors: Object) => {
        console.log("ERRORS", errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
            <FormControl isRequired isInvalid={isInvalid("username")}>
                <FormLabel marginY={2}>Username</FormLabel>
                <Input
                    id="signupUsername"
                    placeholder="Username"
                    {...register("username", {
                        minLength: {
                            value: MIN_LENGTH,
                            message: `Username must be at least ${MIN_LENGTH} character`,
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: `Username must be at most ${MAX_LENGTH} characters`,
                        },
                    })}
                />
                {errors.username && (
                    <FormErrorMessage>{errors.username.message}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isInvalid("email")}>
                <FormLabel marginY={2}>Email Address</FormLabel>
                <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Email Address"
                    {...register("email", {
                        minLength: {
                            value: MIN_LENGTH,
                            message: `Email address must be at least ${MIN_LENGTH} character`,
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: `Email address must be at most ${MAX_LENGTH} characters`,
                        },
                        pattern: {
                            value:
                                /[a-zA-Z0-9.! #$%&"*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*/,
                            message: "Please use a valid email address",
                        },
                    })}
                />
                {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isInvalid("password")}>
                <FormLabel marginY={2}>Password</FormLabel>
                <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        onChange: (e) => setPassword(e.target.value),
                        minLength: {
                            value: MIN_LENGTH,
                            message: `Password must be at least ${MIN_LENGTH} character`,
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: `Password must be at most ${MAX_LENGTH} characters`,
                        },
                    })}
                />
                {errors.password && (
                    <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
            </FormControl>
            <FormControl isRequired isInvalid={isInvalid("passwordAgain")}>
                <FormLabel marginY={2}>Password Again</FormLabel>
                <Input
                    id="signupPasswordAgain"
                    type="password"
                    placeholder="Password Again"
                    {...register("passwordAgain", {
                        minLength: {
                            value: MIN_LENGTH,
                            message: `Password must be at least ${MIN_LENGTH} character`,
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: `Password must be at most ${MAX_LENGTH} characters`,
                        },
                        validate: (value) => value == password || 'Passwords do not match',
                    })}
                />
                {errors.passwordAgain && (
                    <FormErrorMessage>{errors.passwordAgain.message}</FormErrorMessage>
                )}
            </FormControl>
            <Button
                type="submit"
                marginY={4}
                colorScheme="facebook"
                isLoading={isSubmitting}
                rightIcon={<ArrowForwardIcon />}>
                Submit
            </Button>
        </form>
    );
};
