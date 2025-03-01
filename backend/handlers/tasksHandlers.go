package handlers

import (
	
	"context"
	"encoding/json"
	"net/http"
	"time"
	"backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

func InitHandlers(c *mongo.Collection) {
	collection = c
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	var tasks []models.Task
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	cursor, _ := collection.Find(ctx, bson.M{})
	for cursor.Next(ctx) {
		var task models.Task
		cursor.Decode(&task)
		tasks = append(tasks, task)
	}
	json.NewEncoder(w).Encode(tasks)
}
