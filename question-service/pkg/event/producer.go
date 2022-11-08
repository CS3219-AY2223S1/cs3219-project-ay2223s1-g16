package event

import (
	"context"
	"encoding/json"

	"github.com/segmentio/kafka-go"
)

const (
	TOPIC = "user-question"
)

var (
	kafkaWriter *kafka.Writer
)

func InitKafkaProducer() {
	kafkaWriter = &kafka.Writer{
		Addr:                   kafka.TCP("kafka-1:29092"),
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
