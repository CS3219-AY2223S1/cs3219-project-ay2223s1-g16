import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface LanguageMenu {
  language: string;
  languages: Array<string>;
  updateLanguageHandler: (language: string) => void;
}

const LanguageMenu = ({
  language,
  languages,
  updateLanguageHandler,
}: LanguageMenu) => {
  const languageList = languages.map((language, index) => (
    <MenuItem
      minH="40px"
      onClick={() => updateLanguageHandler(language)}
      key={index}
    >
      <span>{language}</span>
    </MenuItem>
  ));
  return (
    <Box marginY={2}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {language}
        </MenuButton>
        <MenuList>{languageList}</MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
