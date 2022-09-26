package controllers

import (
	"github.com/go-chi/chi/v5"
	"net/http"
	"question-service/pkg/repositories"
)

var (
	questionRepo *repositories.QuestionRepo
)

func InitQuestionController(repo *repositories.QuestionRepo) *chi.Mux {
	questionRepo = repo

	r := chi.NewRouter()
	r.Route("/questions", func(r chi.Router) {
		r.Get("/", getQuestions)
	})
	return r
}

func getQuestions(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}
