import {
  Stack,
  Skeleton,
  ListItem,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";

type HistoryData = {
  history: [];
};

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
            <Box>
              <Text key={_id}>{`${idx + 1}. ${title}`}</Text>
              <Divider sx={{ my: 2 }} />
            </Box>
          );
        })}
      </Box>
    );
  }
};

export default HistoryList;
