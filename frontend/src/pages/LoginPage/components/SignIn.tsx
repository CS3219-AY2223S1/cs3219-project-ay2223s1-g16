import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

import { FieldErrorsImpl, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useUserStore from "~/store/userStore";
import { userSvcClient } from "~/utils/request";

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export const SignIn = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const zustandLogin = useUserStore((state) => state.login);

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
    try {
      const response = await userSvcClient.post("/login", values);
      const { userId, username } = response.data;
      toast({
        title: "Successfully logged in",
        status: "success",
        isClosable: true,
      });
      zustandLogin(userId, username);
      navigate("/home", { replace: true });
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
    if (
      errors[
        field as keyof FieldErrorsImpl<{ username: string; password: string }>
      ]
    ) {
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
