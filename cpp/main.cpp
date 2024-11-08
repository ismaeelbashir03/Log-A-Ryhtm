#include <iostream>
#include <string>
#include <random>
#include <thread>
#include <chrono>
#include "httplib.h"  
#include "Logger.h"   // Assuming Logger.h provides necessary logging functionality

class Sensor {
public:
    Sensor(const std::string &name, Logger &logger)
        : name(name), logger(logger) {}

    int getRainPercentage() {
        int rainPercent = randomInt(0, 100);
        logger.info(name + " - Rain Percentage: " + std::to_string(rainPercent) + "%");
        if (rainPercent > 80) {
            logger.warning(name + " - High rain probability detected: " + std::to_string(rainPercent) + "%");
        }
        return rainPercent;
    }

    int getCloudCoverage() {
        int cloudCoverage = randomInt(0, 100);
        logger.info(name + " - Cloud Coverage: " + std::to_string(cloudCoverage) + "%");
        if (cloudCoverage > 90) {
            logger.critical(name + " - Severe cloud coverage detected: " + std::to_string(cloudCoverage) + "%");
        }
        return cloudCoverage;
    }

private:
    std::string name;
    Logger &logger;

    int randomInt(int min, int max) {
        static std::random_device rd;
        static std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(min, max);
        return dis(gen);
    }
};

int main(int argc, char *argv[]) {
    // Check if the application name is provided as a command-line argument
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <app_name>" << std::endl;
        return 1;
    }

    // Use the command-line argument as the application name
    std::string appName = argv[1];
    Logger logger(appName, Level::INFO);

    Sensor sensor("C++land", logger);

    // Create HTTP server
    httplib::Server server;

    // Endpoint for rain percentage
    server.Get("/sensor/rain", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Received request on /sensor/rain endpoint");
        int rainPercent = sensor.getRainPercentage();
        res.set_content("Rain Percentage: " + std::to_string(rainPercent) + "%", "text/plain");
    });

    // Endpoint for cloud coverage
    server.Get("/sensor/cloud", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Received request on /sensor/cloud endpoint");
        int cloudCoverage = sensor.getCloudCoverage();
        res.set_content("Cloud Coverage: " + std::to_string(cloudCoverage) + "%", "text/plain");
    });

    // Endpoint for both rain and cloud data
    server.Get("/sensor/all", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Received request on /sensor/all endpoint");
        int rainPercent = sensor.getRainPercentage();
        int cloudCoverage = sensor.getCloudCoverage();
        res.set_content("Rain Percentage: " + std::to_string(rainPercent) + "%\n"
                        "Cloud Coverage: " + std::to_string(cloudCoverage) + "%", "text/plain");
    });

    server.Get("/sensor/info", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Wind is the movement of air from high-pressure areas to low-pressure areas within Earth’s atmosphere. It is influenced by factors like temperature gradients, topography, and the Earth’s rotation. Wind speeds vary from gentle breezes to powerful gusts, and they play a critical role in weather patterns and climate.");
        res.set_content("Delayed response", "text/plain");
    });

    // Endpoint for causing a crash
    server.Get("/sensor/critical", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Received request on /crash endpoint");
        logger.critical("Critical error occurred");
        res.set_content("Critical error occurred", "text/plain");
    });

    server.Get("/sensor/crash", [&](const httplib::Request& req, httplib::Response& res) {
        logger.info("Received request on /crash endpoint");
        logger.critical("Crashing the server intentionally");
        res.set_content("Crashing the server intentionally", "text/plain");
        std::abort();
    });

    std::cout << "Server is running on http://localhost:8080" << std::endl;
    server.listen("0.0.0.0", 8080);

    return 0;
}