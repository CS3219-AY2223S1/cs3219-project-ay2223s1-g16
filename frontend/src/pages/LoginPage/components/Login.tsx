import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { SignUp } from "./SignUp";

import { SignIn } from "./SignIn";

export const Login = () => {
  return (
    <Tabs isFitted sx={{ minH: 466 }}>
      <TabList>
        <Tab>Sign Up</Tab>
        <Tab>Sign In</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SignUp />
        </TabPanel>
        <TabPanel>
          <SignIn />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
