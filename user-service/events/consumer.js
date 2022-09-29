import { Kafka } from "kafkajs";

import { ormAddQuestionToUserHistory } from "../model/user-orm.js";

const TOPIC = "user-question";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "user-service" });

const messageHandler = async (msg) => {
  const userQuestionMsg = JSON.parse(msg);
  const { questionId, title, userOne, userTwo } = userQuestionMsg;

  const question = {
    _id: questionId,
    title: title,
  };
  await ormAddQuestionToUserHistory(userOne, question);
  await ormAddQuestionToUserHistory(userTwo, question);
};

export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ message }) => {
      await messageHandler(message.value.toString());
    },
  });
};
