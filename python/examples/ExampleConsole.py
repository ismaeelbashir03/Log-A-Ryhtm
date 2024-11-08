from logger import Logger, ConsoleHandler, ServerHandler, Level

def main():
    console_handler = ConsoleHandler()
    handlers = [console_handler]
    logger = Logger("ExampleConsole", level=Level.DEBUG, handlers=handlers)

    for i in range(10):
        logger.info(f"Info message {i}")
        logger.debug(f"Debug message {i}")
        logger.warning(f"Warning message {i}")
        logger.error(f"Error message {i}")
        logger.critical(f"Critical message {i}")

if __name__ == "__main__":
    main()