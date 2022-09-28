package types

type Difficulty string

const (
	EASY   Difficulty = "EASY"
	MEDIUM Difficulty = "MEDIUM"
	HARD   Difficulty = "HARD"
)

func IsValidDifficulty(value string) bool {
	comp := Difficulty(value)
	return comp == EASY || comp == MEDIUM || comp == HARD
}
