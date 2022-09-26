package repositories

import "go.mongodb.org/mongo-driver/mongo"

type QuestionRepo struct {
	db *mongo.Collection
}

func InitQuestionRepo(dbClient *mongo.Database) *QuestionRepo {
	return &QuestionRepo{
		dbClient.Collection("questions"),
	}
}
