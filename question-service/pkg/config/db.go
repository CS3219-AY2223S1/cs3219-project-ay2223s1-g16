package config

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func InitDbClient() *mongo.Database {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(DB_URL))
	if err != nil {
		log.Fatal(err.Error())
	}

	DbClient := client.Database(DB_NAME)

	return DbClient
}
