import { Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
    FormHelperText,
    Input, } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { SignUp } from "./SignUp";

export const Login = () => {
    type FormValues = {
        username: string,
        email: string,
        password: string,
        passwordAgain: string,
    }

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<FormValues>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordAgain: "",
        }
    });

    return (
        <Tabs>
        <TabList>
            <Tab>Sign Up</Tab>
            <Tab>Sign In</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <SignUp />
            </TabPanel>
            <TabPanel>
            <p>two!</p>
            </TabPanel>
        </TabPanels>
        </Tabs>
    );
}