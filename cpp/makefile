# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -I.

# Target executable and output directory
TARGET = bin/logger_example
BINDIR = bin

# Source files (only .cpp files)
SRCS = main.cpp

# Generate .o files for each .cpp file
OBJS = $(SRCS:.cpp=.o)

# Default rule to build the executable
all: $(BINDIR) $(TARGET)

# Create the bin directory if it doesn't exist
$(BINDIR):
	mkdir -p $(BINDIR)

# Rule to link object files into the target executable
$(TARGET): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)

# Rule for compiling .cpp files into .o files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

# Clean up object files and the executable
clean:
	rm -rf $(BINDIR)
	rm -f *.o

# Phony targets to avoid conflicts with file names
.PHONY: all clean