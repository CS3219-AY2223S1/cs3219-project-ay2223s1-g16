package event

import (
	"context"
	"encoding/json"
	"log"

	"question-service/pkg/config"

	"github.com/segmentio/kafka-go"
)

const (
	TOPIC     = "user-question"
	PARTITION = 0
)

var (
	kafkaClient *kafka.Conn
)

func InitKafkaProducer() {
	var err error
	kafkaClient, err = kafka.DialLeader(context.Background(), "tcp", config.KAFKA_BROKER, TOPIC, PARTITION)

	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}
}

func SendMessage(message interface{}) error {
	byteMessage, err := json.Marshal(message)
	if err != nil {
		return err
	}

	_, err = kafkaClient.Write(byteMessage)
	if err != nil {
		return err
	}

	return nil
}
