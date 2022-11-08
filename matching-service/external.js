import fetch from "node-fetch";

const QN_SVC_URL = "http://peerprep-question-svc:80/api/v1";

const getQuestionFromQnSvc = async (difficulty, userOne, userTwo) => {
  const response = await fetch(
    `${QN_SVC_URL}/questions/${difficulty}/${userOne}/${userTwo}`
  );
  const result = await response.json();

  return result;
};

export { getQuestionFromQnSvc };
