package handlers

import (
	"backend/models"
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
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
	json.NewEncoder(w).Encode(task)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var task models.Task
	json.NewDecoder(r.Body).Decode(&task)
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": task})
	json.NewEncoder(w).Encode(task)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	collection.DeleteOne(ctx, bson.M{"_id": id})
	w.WriteHeader(http.StatusNoContent)
}
