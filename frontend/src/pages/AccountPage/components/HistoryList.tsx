import {
  Stack,
  Skeleton,
  Box,
  Text,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useUserStore from "~/store/userStore";
import useQuestionData from "../hooks/useQuestionData";
import HistoryModal from "./HistoryModal";

type HistoryData = {
  history: [];
};

interface SelectedQuestion {
  index: number;
  id: string;
}

const HistoryList = ({
  data,
  isLoading,
}: {
  data: HistoryData;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  } else {
    const { history } = data;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const jwtToken = useUserStore((state) => state.token);
    const [selected, setSelected] = useState<SelectedQuestion | null>(null);

    const { data: questionData, isLoading } = useQuestionData(
      selected?.id || "",
      jwtToken
    );
    const selectedQn = useMemo(() => questionData || undefined, [questionData]);

    const onSelect = (index: number, id: string) => {
      setSelected({ index: index + 1, id });
      onOpen();
    };

    return (
      <Box
        sx={{
          height: "200px",
          width: "300px",
          overflowY: "auto",
        }}
      >
        {history.map((qn, idx) => {
          const { _id, title } = qn;
          return (
            <Box onClick={() => onSelect(idx, _id)} sx={{ cursor: "pointer" }}>
              <Text key={_id}>{`${idx + 1}. ${title}`}</Text>
              <Divider sx={{ my: 2 }} />
            </Box>
          );
        })}
        <HistoryModal
          isOpen={isOpen}
          onClose={onClose}
          index={selected?.index}
          question={selectedQn}
          isLoading={isLoading}
        />
      </Box>
    );
  }
};

export default HistoryList;
