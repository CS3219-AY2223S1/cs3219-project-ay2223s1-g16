package event

type UserQuestionMessage struct {
	Id      string `json:"questionId"`
	Title   string `json:"title"`
	UserOne string `json:"userOne"`
	UserTwo string `json:"userTwo"`
}
