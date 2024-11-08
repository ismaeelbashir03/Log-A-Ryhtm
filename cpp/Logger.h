#pragma once
#ifndef LOGGER_H
#define LOGGER_H

#include "ConsoleHandler.h"
#include "ServerHandler.h"
#include "Handler.h"
#include <memory>
#include <vector>

class Logger {
public:
    Logger(const std::string& appName, Level level = Level::INFO)
        : appName(appName), level(level) {
        handlers.push_back(std::make_unique<ConsoleHandler>());
        handlers.push_back(std::make_unique<ServerHandler>(appName));
    }

    void info(const std::string& message) {
        logMessage(Level::INFO, message);
    }

    void debug(const std::string& message) {
        logMessage(Level::DEBUG, message);
    }

    void warning(const std::string& message) {
        logMessage(Level::WARNING, message);
    }

    void error(const std::string& message) {
        logMessage(Level::ERROR, message);
    }

    void critical(const std::string& message) {
        logMessage(Level::CRITICAL, message);
    }

    void data(const std::string& name, double value) {
        DataLog log(appName, name, value);
        for (const auto& handler : handlers) {
            handler->send(log);
        }
    }

private:
    std::string appName;
    Level level;
    std::vector<std::unique_ptr<Handler>> handlers;

    void logMessage(Level logLevel, const std::string& message) {
        if (logLevel >= level) {
            MessageLog log(appName, logLevel, message);
            for (const auto& handler : handlers) {
                handler->send(log);
            }
        }
    }
};

#endif // LOGGER_H