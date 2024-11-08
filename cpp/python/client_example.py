import requests
import time

endpoints = ["rain", "cloud", "all"]
i = 0

if __name__ == "__main__":
    while True:
        response = requests.get(f"http://localhost:8080/sensor/{endpoints[i]}")
        i += 1
        i %= 3
        print(i)
        time.sleep(2)