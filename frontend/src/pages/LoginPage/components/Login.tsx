import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { SignUp } from "./SignUp";

import { SignIn } from "./SignIn";

export const Login = () => {
  return (
    <Tabs isFitted sx={{ minH: 466 }}>
      <TabList>
        <Tab>Sign In</Tab>
        <Tab>Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SignIn />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
