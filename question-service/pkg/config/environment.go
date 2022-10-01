package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DB_URL       string
	DB_NAME      string
	SERVER_PORT  string
	KAFKA_BROKER string
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("No .env file found: %s\n\n", err.Error())
	}

	DB_URL = os.Getenv("DB_URL")
	DB_NAME = os.Getenv("DB_NAME")
	SERVER_PORT = os.Getenv("SERVER_PORT")
	KAFKA_BROKER = os.Getenv("KAFKA_BROKER")
}
