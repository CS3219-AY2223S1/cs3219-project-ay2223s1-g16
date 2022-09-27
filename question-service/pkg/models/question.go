package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"question-service/pkg/types"
)

type Question struct {
	Id          primitive.ObjectID `bson:"_id"`
	Title       string
	Description string
	Difficulty  types.Difficulty
	Topics      []string
}
