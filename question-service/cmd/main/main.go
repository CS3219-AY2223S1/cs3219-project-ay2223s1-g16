package main

import (
	"net/http"

	"question-service/pkg/config"
	"question-service/pkg/controllers"
	"question-service/pkg/repositories"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	dbClient := config.InitDbClient()
	repos := repositories.InitRepositories(dbClient)
	questionRouter := controllers.InitQuestionController(repos.QuestionRepo)

	basePrefix := "/api/v1"
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Mount(basePrefix, questionRouter)

	http.ListenAndServe(":"+config.SERVER_PORT, r)
}
