// logger/LogTypes.h

#ifndef LOGTYPES_H
#define LOGTYPES_H

#include <string>
#include <ctime>
#include <sstream>
#include <iomanip>

enum class Level {
    INFO,
    DEBUG,
    WARNING,
    ERROR,
    CRITICAL
};

class Log {
public:
    virtual std::string getMessage() const = 0;
    virtual std::string getTimestamp() const {
        std::ostringstream oss;
        auto t = std::time(nullptr);
        oss << std::put_time(std::localtime(&t), "%Y-%m-%d %H:%M:%S");
        return oss.str();
    }
    virtual ~Log() = default;
};

class MessageLog : public Log {
public:
    MessageLog(const std::string& appName, Level level, const std::string& message)
        : appName(appName), level(level), message(message) {}

    std::string getMessage() const override {
        return "[" + getTimestamp() + "] [" + appName + "] [" + levelToString() + "] " + message;
    }

private:
    std::string appName;
    Level level;
    std::string message;

    std::string levelToString() const {
        switch (level) {
            case Level::INFO: return "INFO";
            case Level::DEBUG: return "DEBUG";
            case Level::WARNING: return "WARNING";
            case Level::ERROR: return "ERROR";
            case Level::CRITICAL: return "CRITICAL";
        }
        return "UNKNOWN";
    }
};

class DataLog : public Log {
public:
    DataLog(const std::string& appName, const std::string& name, double value)
        : appName(appName), name(name), value(value) {}

    std::string getMessage() const override {
        return "[" + getTimestamp() + "] [" + appName + "] [" + levelToString(Level::INFO) + "] " + name + "=" + std::to_string(value);
    }

private:
    std::string appName;
    std::string name;
    double value;

    std::string levelToString(Level level) const {
        switch (level) {
            case Level::INFO: return "INFO";
            case Level::DEBUG: return "DEBUG";
            case Level::WARNING: return "WARNING";
            case Level::ERROR: return "ERROR";
            case Level::CRITICAL: return "CRITICAL";
        }
        return "UNKNOWN";
    }
};

#endif // LOGTYPES_H