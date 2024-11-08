#pragma once
#ifndef CONSOLEHANDLER_H
#define CONSOLEHANDLER_H

#include "LogTypes.h"
#include "Handler.h"
#include "Handler.h"
#include <iostream>

class ConsoleHandler: public Handler {
public:
    void send(const Log& log) const {
        std::cout << log.getMessage() << std::endl;
    }
};

#endif // CONSOLEHANDLER_H