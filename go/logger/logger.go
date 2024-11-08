// logger/logger.go

package logger

import (
	"time"
)

// Logger struct for the logging system
type Logger struct {
	AppName  string
	Level    Level
	Handlers []Handler
}

func NewLogger(appName string, level Level, handlers []Handler) *Logger {
	if len(handlers) == 0 {
		handlers = []Handler{&ConsoleHandler{}}
	}
	for _, handler := range handlers {
		if serverHandler, ok := handler.(*ServerHandler); ok {
			serverHandler.Setup(appName)
		}
	}
	return &Logger{AppName: appName, Level: level, Handlers: handlers}
}

func (l *Logger) logMessage(level Level, message string) {
	if level >= l.Level {
		timestamp := time.Now().Format("2006-01-02 15:04:05")
		log := &MessageLog{AppName: l.AppName, Timestamp: timestamp, Level: level, Message: message}
		for _, handler := range l.Handlers {
			handler.Send(log)
		}
	}
}

func (l *Logger) Info(message string) {
	l.logMessage(INFO, message)
}

func (l *Logger) Debug(message string) {
	l.logMessage(DEBUG, message)
}

func (l *Logger) Warning(message string) {
	l.logMessage(WARNING, message)
}

func (l *Logger) Error(message string) {
	l.logMessage(ERROR, message)
}

func (l *Logger) Critical(message string) {
	l.logMessage(CRITICAL, message)
}

func (l *Logger) LogData(name string, value float64) {
	timestamp := time.Now().Format("2006-01-02 15:04:05")
	log := &DataLog{AppName: l.AppName, Timestamp: timestamp, Name: name, Value: value}
	for _, handler := range l.Handlers {
		handler.Send(log)
	}
}