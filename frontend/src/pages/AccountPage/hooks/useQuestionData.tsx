import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { qnSvcClient } from "~/utils/request";

const getQuestionById = async (id: string, jwtToken: string) => {
  const response = await qnSvcClient.get(`/questions/${id}`, jwtToken);
  return response.data;
};

const useQuestionData = (id: string, jwtToken: string) => {
  const toast = useToast();
  const query = useQuery(
    ["historyQuestion", id],
    () => getQuestionById(id, jwtToken),
    {
      onError: () => {
        toast({
          title: "Failed to fetch question",
          status: "error",
          isClosable: true,
        });
      },
    }
  );

  return query;
};

export default useQuestionData;
