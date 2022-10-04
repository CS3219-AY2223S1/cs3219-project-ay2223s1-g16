import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LanguageModal from "./LanguageModal";
import { useState } from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeLanguage, setChangeLanguage] = useState<string>("");

  const changeLanguageHandler = (lang: string) => {
    if (lang !== language) {
      setChangeLanguage(lang);
      onOpen();
    }
  };

  const languageList = languages.map((language, index) => (
    <MenuItem
      minH="40px"
      onClick={() => changeLanguageHandler(language)}
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
      <LanguageModal
        isOpen={isOpen}
        onClose={onClose}
        changeLanguage={() => updateLanguageHandler(changeLanguage)}
      />
    </Box>
  );
};

export default LanguageMenu;
