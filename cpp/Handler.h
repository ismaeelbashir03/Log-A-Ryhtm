#pragma once
#ifndef HANDLER_H
#define HANDLER_H

#include "LogTypes.h"
#include <fstream>
#include <iostream>
#include <string>
#include <filesystem>

class Handler {
public:

    virtual void send(const Log& log) const {
        std::__throw_failure("Method not implemented");
    }
};

#endif // HANDLER_H