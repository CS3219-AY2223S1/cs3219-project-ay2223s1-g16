package repositories

import "go.mongodb.org/mongo-driver/mongo"

type Repositories struct {
	QuestionRepo *QuestionRepo
}

func InitRepositories(dbClient *mongo.Database) *Repositories {
	questionRepo := InitQuestionRepo(dbClient)
	return &Repositories{QuestionRepo: questionRepo}
}
