# Log-A-Rhythm

## Inspiration

Log aggregation enables centralized event collection from diverse sources, facilitating efficient searching, analysis, and data understanding. As cloud computing and microservices proliferate, managing log data across these distributed systems becomes complex. **Log-A-Rhythm** aims to simplify log aggregation by abstracting complexities and providing an intuitive interface for both manual analysis and automated notifications.

## What it Does

**Log-A-Rhythm** offers client libraries that seamlessly integrate with existing logging setups, ensuring that user experience remains unaffected while logs are made interoperable with Log-A-Rhythm's ecosystem. FileBeat, LogStash, and ElasticSearch handle the heavy lifting, allowing developers to focus on analysis without needing to reconfigure their logging infrastructure.

## How We Built It

The core of **Log-A-Rhythm** includes three client libraries for **Python**, **C++**, and **Go**. These libraries are designed to integrate with standard logging solutions in each language while preserving backward compatibility. Logs are initially stored locally and then sent to LogStash via FileBeat. LogStash parses and structures the logs, extracting details like log levels and error codes, before forwarding them to ElasticSearch for storage and front-end display.

The front-end, built with **Next.js**, **TypeScript**, and **TailwindCSS**, provides a minimalistic interface that supports live data views, log analysis, and alert threshold configuration.

## Challenges We Faced

Our team was new to much of the data engineering tech stack, including ElasticSearch and the broader ELK stack. Understanding complex documentation and debugging across multiple languages posed a major challenge, as errors surfaced in unexpected forms.

## Accomplishments

Successfully building a multi-part log aggregation system within a 12-hour timeframe was a significant achievement for our team.

## What We Learned

Working with ElasticSearch is challenging, especially within limited time frames. We gained insights into file handling across systems, real-time data streaming, and quickly integrating authentication with Auth providers.

## Future Plans

1. Expand language support to include **Rust**, **Java**, **Scala**, and more.
2. Develop an analytics engine leveraging both ML and statistical tools for deeper system insights.

## Built With

- **C++**
- **ElasticSearch**
- **FileBeat**
- **LogStash**
- **Next.js**
- **Python**
- **Tailwind**
- **TypeScript**

## Logger Documentation

The **Log-A-Rhythm Logger** is a cross-language logging interface available in **Go**, **Python**, and **C++**. This logger serves as a wrapper, providing a unified logging experience across supported languages with built-in server and console logging support.

### Python Logger

```python
class Logger:
    """
    Logger class for Python. Supports server and console logging.
    """
    def __init__(self, app_name: str, level: Level = Level.INFO, handlers: List[Handler] = []):
        # Initialization logic

    def info(self, message: str):
        """Log an info message."""
    
    def debug(self, message: str):
        """Log a debug message."""
    
    def warning(self, message: str):
        """Log a warning message."""
    
    def error(self, message: str):
        """Log an error message."""
    
    def critical(self, message: str):
        """Log a critical message."""
    
    def data(self, name: str, value: Union[float, int]):
        """Log a data point."""
    
    def cpu(self):
        """Log CPU usage."""
    
    def memory(self, test: bool = False):
        """Log memory usage."""
    
    def disk(self):
        """Log disk usage."""
```

### Go Logger

```go
type Logger struct {
    AppName  string
    Level    Level
    Handlers []Handler
}

func (l *Logger) Info(message string) {
    // Log info message
}

func (l *Logger) Debug(message string) {
    // Log debug message
}

func (l *Logger) Warning(message string) {
    // Log warning message
}

func (l *Logger) Error(message string) {
    // Log error message
}

func (l *Logger) Critical(message string) {
    // Log critical message
}
```

### C++ Logger

```cpp
class Logger {
public:
    Logger(const std::string& appName, Level level = Level::INFO);

    void info(const std::string& message);
    void debug(const std::string& message);
    void warning(const std::string& message);
    void error(const std::string& message);
    void critical(const std::string& message);

    void data(const std::string& name, double value);
};
```

The logger implementations are designed to integrate with your system’s logging infrastructure, streamlining log aggregation and analysis across your microservices.

