package controllers

import (
	"net/http"

	"question-service/pkg/repositories"
	"question-service/pkg/types"
	"question-service/pkg/utils"

	"github.com/go-chi/chi/v5"
)

var (
	questionRepo *repositories.QuestionRepo
)

func InitQuestionController(repo *repositories.QuestionRepo) *chi.Mux {
	questionRepo = repo

	r := chi.NewRouter()
	r.Route("/questions", func(r chi.Router) {
		r.Post("/", addQuestion)
		r.Get("/{difficulty}", getRandomQnByDifficulty)
	})
	return r
}

func addQuestion(w http.ResponseWriter, r *http.Request) {
	id := questionRepo.CreateQuestion(r.Context())
	utils.JsonResponse(w, http.StatusCreated, map[string]string{"id": id})
}

func getRandomQnByDifficulty(w http.ResponseWriter, r *http.Request) {
	difficulty := chi.URLParam(r, "difficulty")
	if !types.IsValidDifficulty(difficulty) {
		utils.ErrorResponse(w, http.StatusBadRequest, "Invalid difficulty")
		return
	}

	result, err := questionRepo.SampleQnByDifficulty(r.Context(), types.Difficulty(difficulty))
	if err != nil {
		utils.ErrorResponse(w, 404, err.Error())
		return
	}

	utils.JsonResponse(w, http.StatusOK, result)
}
