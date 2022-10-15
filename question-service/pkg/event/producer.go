package event

import (
	"context"
	"encoding/json"
	"github.com/segmentio/kafka-go"
	"question-service/pkg/config"
)

const (
	TOPIC = "user-question"
)

var (
	kafkaWriter *kafka.Writer
)

func InitKafkaProducer() {
	kafkaWriter = &kafka.Writer{
		Addr:                   kafka.TCP(config.KAFKA_BROKER),
		Topic:                  TOPIC,
		AllowAutoTopicCreation: true,
	}
}

func SendMessage(id string, message interface{}) error {
	byteMessage, err := json.Marshal(message)
	if err != nil {
		return err
	}

	err = kafkaWriter.WriteMessages(context.Background(), kafka.Message{
		Key:   []byte(id),
		Value: byteMessage,
	})
	if err != nil {
		return err
	}

	return nil
}
