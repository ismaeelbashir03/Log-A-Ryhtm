// logger/main.go

package main

import (
	"logger.com/go/logger"
)

func main() {
	handlers := []logger.Handler{&logger.ConsoleHandler{}, &logger.ServerHandler{}}
	log := logger.NewLogger("MyApp", logger.INFO, handlers)

	log.Info("This is an info message.")
	log.Debug("This is a debug message.")
	log.Warning("This is a warning.")
	log.Error("This is an error message.")
	log.Critical("This is a critical message.")
	log.LogData("DataMetric", 42.5)
}