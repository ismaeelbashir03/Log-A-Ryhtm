import os
import socket
import sys
import time
from typing import Union
from enum import Enum

class Level(Enum):
    """
    Levels Enum for different log levels
    """
    INFO = 0
    DEBUG = 1
    WARNING = 2
    ERROR = 3
    CRITICAL = 4


class Log:
    """
    Base class for log types.
    """
    def get_message(self) -> str:
        raise NotImplementedError("Log class must implement the get_message method.")

    def get_timestamp(self) -> str:
        raise NotImplementedError("Log class must implement the get_timestamp method.")

class MessageLog(Log):
    """
    Log class for messages.
    """
    def __init__(self, app_name: str, timestamp: str, level: Level, message: str) -> None:
        self.app_name = app_name
        self.timestamp = timestamp
        self.level = level
        if not isinstance(message, str):
            raise ValueError("MessageLog 'message' must be of type str.")
        self.message = message
    
    def get_message(self) -> str:
        return f"[{self.timestamp}] [{self.app_name}] [{self.level.name}] {self.message}"
    
    def get_timestamp(self) -> str:
        return self.timestamp

class DataLog(Log):
    """
    Log class for data.
    """
    def __init__(self, app_name: str, timestamp: str, name: str, value: Union[float, int]) -> None:
        self.app_name = app_name
        self.timestamp = timestamp
        if not isinstance(name, str):
            raise ValueError("DataLog 'name' must be of type str.")
        self.name = name
        if not isinstance(value, (float, int)):
            raise ValueError("DataLog 'value' must be of type float or int.")
        self.value = value
    
    def get_message(self) -> str:
        return f"[{self.timestamp}] [{self.app_name}] [{Level.INFO.name}] {self.name}={self.value}"
    
    def get_timestamp(self) -> str:
        return self.timestamp
    
class HealthLog(Log):
    """
    Log class for Health monitoring.
    """
    def __init__(self, app_name: str, timestamp: str, name: str, percent: float) -> None:
        self.app_name = app_name
        self.timestamp = timestamp
        if not isinstance(name, str):
            raise ValueError("HealthLog 'name' must be of type str.")
        self.name = name
        if not isinstance(percent, float):
            raise ValueError("HealthLog 'percent' must be of type float.")
        self.percent = percent
    
    def get_message(self) -> str:
        return f"[{self.timestamp}] [{self.app_name}] [{Level.INFO.name}] {self.name}={self.percent}%"
    
    def get_timestamp(self) -> str:
        return self.timestamp
    
class Handler:
    """
    Base Handler class.

    Defines the interface for all log handlers.
    """
    def send(self, message: str):
        raise NotImplementedError("Log handler must implement the send method.")


class ConsoleHandler(Handler):
    """
    Console Handler class for logging.

    Prints logs to console.
    """
    def send(self, log: Log):
        print(log.get_message())

class ServerHandler(Handler):
    """
    Server Handler class for logging.

    Sends logs to centralised server. This is done through http requests.
    """
    def __init__(self) -> None:
        super().__init__()
        self.node_id = None

    def setup(self, app_name: str) -> str:
        """
        Setup the logger with the given app name.

        Args:
            app_name (str): Name of the application.

        Returns:
            node_id (str): Unique node id for this logger.
        """
        ip = socket.gethostbyname(socket.gethostname())
        time_now = time.time()
        self.node_id = hash(f"{app_name}_{ip}_{time_now}") % ((sys.maxsize + 1) * 2)
        self.log_dir = "/tmp/Logger"
        self.file_name = f"{self.node_id}.log"
        os.makedirs(self.log_dir, exist_ok=True)
        print("Temporary log file path:", self.log_dir)

    def send(self, log: Log):
        if not self.node_id or not self.log_dir:
            raise Exception("Logger not setup. Call setup() before sending logs.")

        log_type = log.__class__.__name__
        with open(self.log_dir + "/" + self.file_name, "a") as f:
            f.write(f"[{self.node_id}] [{log_type}] {log.get_message()}\n")