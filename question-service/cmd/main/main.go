package main

import (
	"net/http"
	"question-service/pkg/event"

	"question-service/pkg/config"
	"question-service/pkg/controllers"
	"question-service/pkg/repositories"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	event.InitKafkaProducer()
	dbClient := config.InitDbClient()
	repos := repositories.InitRepositories(dbClient)
	questionRouter := controllers.InitQuestionController(repos.QuestionRepo)

	basePrefix := "/api/v1"
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
	}))
	r.Use(middleware.Logger)
	r.Mount(basePrefix, questionRouter)

	http.ListenAndServe(":"+config.SERVER_PORT, r)
}
