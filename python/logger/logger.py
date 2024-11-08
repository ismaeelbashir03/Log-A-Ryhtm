from typing import List, Union
from .log_types import Handler, ConsoleHandler, ServerHandler, Level, Log, MessageLog, DataLog, HealthLog
import time
import psutil

class Logger:
    """
    Logger class for python.

    Supports:
        - Server logging (sent to elastic search server)
        - Console logging (prints to console)

    """
    def __init__(self, app_name: str, level: Level = Level.INFO, handlers: List[Handler] = []) -> None:
        if len(app_name.split(" ")) != 1:
            raise ValueError("App name must not contain spaces.")
        self.app_name = app_name
        self.level = level

        # default handler is console handler if not specified
        if not handlers:
            handlers = [ConsoleHandler()]

        # setup handlers
        self.handlers = []
        for handler in handlers:
            if not isinstance(handler, Handler):
                raise ValueError("Handlers must be of type Handler.")
            
            # setup server handler
            if isinstance(handler, ServerHandler):
                handler.setup(self.app_name)

            self.handlers.append(handler)
    
    def _log_message(self, level: Level, message: str):
        if level.value >= self.level.value:
            current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
            log: MessageLog = MessageLog(self.app_name, current_time, level, message)
            for handler in self.handlers:
                handler.send(log)
    
    def info(self, message: str):
        """
        Log an information Message Log.

        Args:
            message (str): Message to log.
        """
        self._log_message(Level.INFO, message)
    
    def debug(self, message: str):
        """
        Log a debug Message Log.

        Args:
            message (str): Message to log.
        """
        self._log_message(Level.DEBUG, message)

    def warning(self, message: str):
        self._log_message(Level.WARNING, message)
    
    def error(self, message: str):
        """
        Log an error Message Log.

        Args:
            message (str): Message to log.
        """
        self._log_message(Level.ERROR, message)
    
    def critical(self, message: str):
        """
        Log a critical Message Log.

        Args:
            message (str): Message to log.
        """
        self._log_message(Level.CRITICAL, message)

    def _log_data(self, name: str, value: Union[float, int]):
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        log: DataLog = DataLog(self.app_name, current_time, name, value)
        for handler in self.handlers:
            handler.send(log)
    
    def data(self, name: str, value: Union[float, int]):
        """
        Log a data Data Log.

        Args:
            name (str): Name of the data.
            value (Union[float, int]): Value of the data.
        """
        self._log_data(name, value)
    
    def _log_system(self, name: str, percent: Union[float, int]):
        current_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        log: HealthLog = HealthLog(self.app_name, current_time, name, percent)
        for handler in self.handlers:
            handler.send(log)
        
    def cpu(self):
        """
        Log the current CPU usage.
        """
        self._log_system("CPU", psutil.cpu_percent(0.1))
    
    def memory(self, test: bool = False):
        """
        Log the current memory usage.
        """
        if test:
            self._log_system("Memory", 100.0)
        else:
            self._log_system("Memory", psutil.virtual_memory().percent)
    
    def disk(self):
        """
        Log the current disk usage.
        """
        self._log_system("Disk", psutil.disk_usage('/').percent)
    
