package repositories

import (
	"context"

	"question-service/pkg/models"
	"question-service/pkg/types"

	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
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

func (questionRepo *QuestionRepo) SampleQnByDifficulty(ctx context.Context, difficulty types.Difficulty) (*models.Question, error) {
	matchStage := bson.D{{"$match", bson.D{{"difficulty", difficulty}}}}
	aggStage := bson.D{{"$sample", bson.D{{"size", 1}}}}
	mongoPipeline := mongo.Pipeline{matchStage, aggStage}

	qnCursor, err := questionRepo.db.Aggregate(ctx, mongoPipeline)

	if err != nil {
		panic(err)
	}

	var question []models.Question
	if err = qnCursor.All(ctx, &question); err != nil {
		panic(err)
	}

	if len(question) == 0 {
		return nil, errors.New("No question found")
	} else {
		return &question[0], nil
	}
}
