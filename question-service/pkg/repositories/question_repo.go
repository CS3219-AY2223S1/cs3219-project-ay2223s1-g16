package repositories

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"question-service/pkg/models"
	"question-service/pkg/types"
)

type QuestionRepo struct {
	db *mongo.Collection
}

func InitQuestionRepo(dbClient *mongo.Database) *QuestionRepo {
	return &QuestionRepo{
		dbClient.Collection("questions"),
	}
}

func (questionRepo *QuestionRepo) CreateQuestion(ctx context.Context) string {
	question := &models.Question{
		Id:          primitive.NewObjectID(),
		Title:       "Testing",
		Description: "Testing",
		Difficulty:  types.EASY,
		Topics:      []string{"bfs", "dfs"},
	}

	result, err := questionRepo.db.InsertOne(ctx, question)

	if err != nil {
		panic(err)
	}

	return result.InsertedID.(primitive.ObjectID).Hex()
}
