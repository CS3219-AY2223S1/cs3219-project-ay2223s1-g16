package models

import "question-service/pkg/types"

type Question struct {
	Description string
	Difficulty  types.Difficulty
	Topics      []string
}
