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

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export const SignIn = () => {
  const toast = useToast();

  type FormValues = {
    username: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmitHandler = async (values: FormValues) => {
    const { username, password } = values;
    console.log(username, password);
    try {
      await new Promise((r) => setTimeout(r, 1000));
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

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl isRequired isInvalid={isInvalid("username")}>
        <FormLabel marginY={2}>Username</FormLabel>
        <Input
          id="signinUsername"
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
          id="signinPassword"
          type="password"
          placeholder="Password"
          {...register("password", {
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
