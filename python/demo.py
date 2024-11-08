import time
import random
import argparse
from logger import ConsoleHandler, ServerHandler, Logger, Level

class Sensor:
    def __init__(self, name, logger):
        self.name = name
        self.logger = logger

    def get_fake_sensor_data(self):
        temperature = round(random.uniform(15.0, 25.0), 2)
        humidity = random.randint(30, 80)
        self.logger.data("temperature", temperature)
        self.logger.data("humidity", humidity)
        return {"temperature": temperature, "humidity": humidity, "source": "fake"}

def log_sensor_data(sensor):
    seconds = 5
    for i in range(seconds):
        data = sensor.get_fake_sensor_data()
        # log cpu, memory, disk usage
        sensor.logger.cpu()
        sensor.logger.memory()
        sensor.logger.disk()
        time.sleep(1)  
    
    # send a simulated crash (memory leak)
    sensor.logger.error("java.lang.OutOfMemoryError: Java heap space")
    sensor.logger.memory(test=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Log sensor data with CPU, memory, and disk usage.")
    parser.add_argument("--app_name", type=str, help="Name of the application for logging purposes")
    args = parser.parse_args()

    if not args.app_name:
        args.app_name = "DefaultApp"

    server_handler = ServerHandler()
    console_handler = ConsoleHandler()
    handlers = [server_handler, console_handler]
    logger: Logger = Logger(args.app_name, level=Level.INFO, handlers=handlers)
    sensor = Sensor("Python Weather Sensor", logger)
    wait = input("Press any key to launch the sensor service node...")
    log_sensor_data(sensor)