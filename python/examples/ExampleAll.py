from logger import Logger, ConsoleHandler, ServerHandler, Level

def main():
    server_handler = ServerHandler()
    console_handler = ConsoleHandler()
    handlers = [server_handler, console_handler]
    logger: Logger = Logger("ExampleAll", level=Level.DEBUG, handlers=handlers)

    for i in range(10):
        logger.info(f"Info message {i}")
        logger.debug(f"Debug message {i}")
        logger.warning(f"Warning message {i}")
        logger.error(f"Error message {i}")
        logger.critical(f"Critical message {i}")
        logger.data("dataName", 123.23)

if __name__ == "__main__":
    main()