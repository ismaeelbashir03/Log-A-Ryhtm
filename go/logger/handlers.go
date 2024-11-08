// logger/handlers.go

package logger

import (
	"fmt"
	"os"
)

// Handler interface for logging handlers
type Handler interface {
	Send(log Log)
}

// ConsoleHandler writes logs to the console
type ConsoleHandler struct{}

func (c *ConsoleHandler) Send(log Log) {
	fmt.Println(log.GetMessage())
}

// ServerHandler simulates sending logs to a centralized server by writing to a file
type ServerHandler struct {
	NodeID   int64
	LogDir   string
	FileName string
}

func (s *ServerHandler) Setup(appName string) {
	s.LogDir = "/tmp/Logger"
	ip := "127.0.0.1" // Placeholder for IP retrieval
	s.NodeID = int64(hash(fmt.Sprintf("%s_%s", appName, ip)))
	s.FileName = fmt.Sprintf("%d.log", s.NodeID)

	if err := os.MkdirAll(s.LogDir, os.ModePerm); err != nil {
		fmt.Println("Error creating log directory:", err)
	}
	fmt.Println("Temporary log file path:", s.LogDir)
}

func (s *ServerHandler) Send(log Log) {
	filePath := fmt.Sprintf("%s/%s", s.LogDir, s.FileName)
	f, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error opening log file:", err)
		return
	}
	defer f.Close()

	logType := fmt.Sprintf("[%s]", fmt.Sprintf("%T", log))
	f.WriteString(fmt.Sprintf("[%d] [%s] %s\n", s.NodeID, logType, log.GetMessage()))
}

// hash function to simulate a unique node ID
func hash(s string) uint32 {
	var h uint32 = 2166136261
	for _, c := range s {
		h = (h * 16777619) ^ uint32(c)
	}
	return h
}