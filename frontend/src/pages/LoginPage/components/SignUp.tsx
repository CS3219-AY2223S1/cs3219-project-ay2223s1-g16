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
import { userSvcClient } from "~/utils/request";

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
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      passwordAgain: "",
    },
  });

  const onSubmitHandler = async (values: FormValues) => {
    try {
      const response = await userSvcClient.post("", values);
      const { message } = response.data;
      toast({
        title: message + "Please login to continue.",
      });
      reset();
    } catch (err: any) {
      const message = err?.response?.data?.message;
      toast({
        title: message ?? "Something went wrong",
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

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
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
            validate: (value) => value == password || "Passwords do not match",
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
        rightIcon={<ArrowForwardIcon />}
      >
        Submit
      </Button>
    </form>
  );
};
