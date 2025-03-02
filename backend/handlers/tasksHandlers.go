package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func CreateTask(w http.ResponseWriter, r *http.Request) {
	var task models.Task
	json.NewDecoder(r.Body).Decode(&task)
	task.ID = primitive.NewObjectID()
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	collection.InsertOne(ctx, task)
	json.NewEncoder(w).Encode(task);
}
