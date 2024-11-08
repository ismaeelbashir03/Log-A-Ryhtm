// logger/ServerHandler.h

#ifndef SERVERHANDLER_H
#define SERVERHANDLER_H

#include "LogTypes.h"
#include "Handler.h"
#include <fstream>
#include <iostream>
#include <string>
#include <filesystem>
#ifdef _WIN32
    #include <winsock2.h>
    #pragma comment(lib, "ws2_32.lib")
#else
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #include <unistd.h>
#endif

class ServerHandler: public Handler {
public:
    ServerHandler(const std::string& appName) {
        std::string ipAddr = getLocalIP();
        nodeID = std::hash<std::string>{}(appName + "_" + ipAddr);
        logDir = "/tmp/Logger";
        fileName = logDir + "/" + std::to_string(nodeID) + ".log";
        std::filesystem::create_directories(logDir);
        std::cout << "Temporary log file path: " << fileName << std::endl;
    }

    void send(const Log& log) const {
        std::ofstream file(fileName, std::ios::app);
        if (file.is_open()) {
            std::string logType = "MessageLog";
            if (dynamic_cast<const DataLog*>(&log)) {
                logType = "DataLog";
            }
            file << "[" << nodeID << "] [" << logType << "] " << log.getMessage() << std::endl;
        } else {
            std::cerr << "Unable to open log file: " << fileName << std::endl;
        }
    }

private:
    size_t nodeID;
    std::string logDir;
    std::string fileName;
    std::string getLocalIP() {
#ifdef _WIN32
        WSADATA wsaData;
        WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif

        std::string localIP = "Unable to determine IP";
        int sock = socket(AF_INET, SOCK_DGRAM, 0);

        if (sock < 0) {
            std::cerr << "Socket creation failed!" << std::endl;
            return localIP;
        }

        struct sockaddr_in addr;
        addr.sin_family = AF_INET;
        addr.sin_port = htons(80);  // Port 80 (HTTP), arbitrary choice for IP detection
        addr.sin_addr.s_addr = inet_addr("8.8.8.8");  // Google's public DNS server

        if (connect(sock, (struct sockaddr*)&addr, sizeof(addr)) == -1) {
            std::cerr << "Connection failed!" << std::endl;
#ifdef _WIN32
            closesocket(sock);
            WSACleanup();
#else
            close(sock);
#endif
            return localIP;
        }

        struct sockaddr_in localAddr;
        socklen_t addrLen = sizeof(localAddr);
        if (getsockname(sock, (struct sockaddr*)&localAddr, &addrLen) == -1) {
            std::cerr << "getsockname failed!" << std::endl;
        } else {
            localIP = inet_ntoa(localAddr.sin_addr);  // Convert IP to string format
        }

#ifdef _WIN32
        closesocket(sock);
        WSACleanup();
#else
        close(sock);
#endif

        return localIP;
    }
};

#endif // SERVERHANDLER_H