package config

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

var (
	DbClient *mongo.Database
)

func InitDbClient() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(DB_URL))
	if err != nil {
		log.Fatal(err.Error())
	}

	DbClient = client.Database(DB_NAME)

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err.Error())
		}
	}()
}
