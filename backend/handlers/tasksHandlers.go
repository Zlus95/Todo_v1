package handlers

import (
    "context"
    "encoding/json"
    "net/http"
    "time"
    "backend/models"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
)

var taskCollection *mongo.Collection

func InitTaskHandlers(c *mongo.Collection) {
    taskCollection = c
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
    var task models.Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    
    userID := r.Context().Value("user_id").(string)
    task.UserID, _ = primitive.ObjectIDFromHex(userID)

   
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if _, err := taskCollection.InsertOne(ctx, task); err != nil {
        http.Error(w, "Failed to create task", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
    // Получаем user_id из контекста
    userID, ok := r.Context().Value("user_id").(string)
    if !ok || userID == "" {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Преобразуем userID в ObjectID
    objID, err := primitive.ObjectIDFromHex(userID)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // Поиск задач пользователя
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    cursor, err := taskCollection.Find(ctx, bson.M{"user_id": objID})
    if err != nil {
        http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
        return
    }
    defer cursor.Close(ctx)

    var tasks []models.Task
    for cursor.Next(ctx) {
        var task models.Task
        cursor.Decode(&task)
        tasks = append(tasks, task)
    }

    json.NewEncoder(w).Encode(tasks)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
    var task models.Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if _, err := taskCollection.UpdateOne(ctx, bson.M{"_id": task.ID}, bson.M{"$set": task}); err != nil {
        http.Error(w, "Failed to update task", http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(task)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
   // Получаем taskID из query-параметров
    taskID := r.URL.Query().Get("id")
    if taskID == "" {
        http.Error(w, "Task ID is required", http.StatusBadRequest)
        return
    }

    // Преобразуем taskID в ObjectID
    objID, err := primitive.ObjectIDFromHex(taskID)
    if err != nil {
        http.Error(w, "Invalid task ID", http.StatusBadRequest)
        return
    }

    // Получаем user_id из контекста
    userID, ok := r.Context().Value("user_id").(string)
    if !ok || userID == "" {
        http.Error(w, "Unauthorized", http.StatusUnauthorized)
        return
    }

    // Преобразуем userID в ObjectID
    userObjID, err := primitive.ObjectIDFromHex(userID)
    if err != nil {
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    // Удаляем задачу из MongoDB
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    result, err := taskCollection.DeleteOne(ctx, bson.M{"_id": objID, "user_id": userObjID})
    if err != nil {
        http.Error(w, "Failed to delete task", http.StatusInternalServerError)
        return
    }

    // Проверяем, была ли удалена задача
    if result.DeletedCount == 0 {
        http.Error(w, "Task not found", http.StatusNotFound)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{"message": "Task deleted successfully"})
}