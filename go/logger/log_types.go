// logger/log_types.go

package logger

import (
	"fmt"
)

// Level represents the logging level
type Level int

const (
	INFO Level = iota
	DEBUG
	WARNING
	ERROR
	CRITICAL
)

// Log interface to define log structure
type Log interface {
	GetMessage() string
	GetTimestamp() string
}

// MessageLog represents a log message
type MessageLog struct {
	AppName   string
	Timestamp string
	Level     Level
	Message   string
}

func (m *MessageLog) GetMessage() string {
	return fmt.Sprintf("[%s] [%s] [%s] %s", m.Timestamp, m.AppName, m.Level.String(), m.Message)
}

func (m *MessageLog) GetTimestamp() string {
	return m.Timestamp
}

// DataLog represents a data log
type DataLog struct {
	AppName   string
	Timestamp string
	Name      string
	Value     float64
}

func (d *DataLog) GetMessage() string {
	return fmt.Sprintf("[%s] [%s] [%s] %s=%v", d.Timestamp, d.AppName, Level.INFO, d.Name, d.Value)
}

func (d *DataLog) GetTimestamp() string {
	return d.Timestamp
}

// String representation for the Level type
func (l Level) String() string {
	switch l {
	case INFO:
		return "INFO"
	case DEBUG:
		return "DEBUG"
	case WARNING:
		return "WARNING"
	case ERROR:
		return "ERROR"
	case CRITICAL:
		return "CRITICAL"
	default:
		return "UNKNOWN"
	}
}