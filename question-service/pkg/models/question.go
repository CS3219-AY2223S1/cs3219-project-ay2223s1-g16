package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"question-service/pkg/types"
)

type Question struct {
	Id          primitive.ObjectID `bson:"_id" json:"id"`
	Title       string             `json:"title"`
	Description string             `json:"description"`
	Difficulty  types.Difficulty   `json:"difficulty"`
	Topics      []string           `json:"topics"`
}
