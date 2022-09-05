import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Box,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { useState } from "react";

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export const SignUp = () => {
    const [password, setPassword] = useState("");

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

    const onSubmitHandler = (values: FormValues) => {
        const { username, email, password } = values;
        console.log(username, email, password);
    };

    const isInvalid = (field: string) => {
        if (errors[field]) {
            return true;
        }
        return false;
    };

    const onErrorHandler = (errors: Object) => {
        console.log(errors);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
            <FormControl isRequired isInvalid={isInvalid("username")}>
                <FormLabel marginY={2}>Username</FormLabel>
                <Input
                    id="username"
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
                    id="email"
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
                    id="password"
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
                    id="passwordAgain"
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
            <Button type="submit" marginY={2} colorScheme="facebook">
                Submit
            </Button>
        </form>
    );
};
