package controllers

import (
	"github.com/go-chi/chi/v5"
	"net/http"
	"question-service/pkg/repositories"
	"question-service/pkg/utils"
)

var (
	questionRepo *repositories.QuestionRepo
)

func InitQuestionController(repo *repositories.QuestionRepo) *chi.Mux {
	questionRepo = repo

	r := chi.NewRouter()
	r.Route("/questions", func(r chi.Router) {
		r.Get("/", getQuestions)
		r.Post("/", addQuestion)
	})
	return r
}

func getQuestions(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World"))
}

func addQuestion(w http.ResponseWriter, r *http.Request) {
	id := questionRepo.CreateQuestion(r.Context())
	w.WriteHeader(http.StatusCreated)
	utils.JsonResponse(w, http.StatusCreated, map[string]string{"id": id})
}
