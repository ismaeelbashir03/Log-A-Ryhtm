// main.go

package main

import (
	"flag"
	"fmt"
	"math/rand"
	"time"
	"os"

	"logger.com/go/logger"
)

// Sensor represents a simulated environmental sensor
type Sensor struct {
	name   string
	logger *logger.Logger
}

// NewSensor initializes a new Sensor with a name and logger
func NewSensor(name string, log *logger.Logger) *Sensor {
	return &Sensor{name: name, logger: log}
}

// getFakeSensorData generates random air pressure, light intensity, and wind speed data
func (s *Sensor) getFakeSensorData() map[string]interface{} {
	airPressure := 950.0 + rand.Float64()*(1050.0-950.0) // Air pressure in hPa
	windSpeed := rand.Float64() * 20.0                    // Wind speed between 0-20 m/s

	s.logger.LogData("airPressure", airPressure)
	s.logger.LogData("windSpeed", windSpeed)

	// Trigger a warning if the wind speed exceeds 15 m/s
	s.logger.Warning(fmt.Sprintf("High wind speed detected: %.2f m/s", windSpeed))

	return map[string]interface{}{
		"airPressure":   airPressure,
		"windSpeed":      windSpeed,
	}
}

// logSensorData continuously logs sensor data every 2 seconds
func logSensorData(sensor *Sensor) {
	for {
		sensor.getFakeSensorData()
		time.Sleep(2 * time.Second)
	}
}

func main() {
	// Parse the application name from command-line arguments
	appName := flag.String("app_name", "DefaultApp", "Name of the application for logging purposes")
	flag.Parse()

	if *appName == "" {
		fmt.Println("Error: app_name argument is required")
		os.Exit(1)
	}

	// Set up handlers and logger
	handlers := []logger.Handler{&logger.ConsoleHandler{}, &logger.ServerHandler{}}
	log := logger.NewLogger(*appName, logger.INFO, handlers)

	// Create a sensor and start logging data
	sensor := NewSensor("Golandia", log)
	logSensorData(sensor)
}