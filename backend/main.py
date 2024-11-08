import asyncio
from typing import Union
from datetime import datetime, timedelta

from fastapi import Depends, FastAPI, WebSocket
from typing_extensions import Annotated
from apscheduler.schedulers.background import BackgroundScheduler



app = FastAPI()


import os
import resend


from functools import lru_cache
from . import config 

from elasticsearch import AsyncElasticsearch

client = AsyncElasticsearch(["https://singular-duly-fowl.ngrok-free.app"])

@lru_cache
def get_settings():
    return config.Settings()

async def fetch_logs(websocket):
    first_connection = True

    while True:
        if first_connection:
            query = {"match_all": {}}
            first_connection = False
        else:
            now = datetime.utcnow()
            five_seconds_ago = now - timedelta(seconds=5)
            query = {
                "range": {
                    "@timestamp": {
                        "gte": five_seconds_ago.isoformat(),
                        "lte": now.isoformat()
                    }
                }
            }

        resp = await client.search(
            index="log*",
            body={"query": query},
            size=20
        )
        hits = resp.get('hits', {}).get('hits', [])
        ids = [hit['_source']['id'] for hit in hits]
        log = [hit['_source']['log'] for hit in hits]
        timestamp = [hit['_source']['@timestamp'] for hit in hits]
        log_level = [hit['_source']['log_level'] for hit in hits]

        arr = []
        for i in range(len(ids)):
            arr.append({
                'id': ids[i],
                'content': log[i],
                'timestamp': timestamp[i],
                'log_level': log_level[i]
            })
        print(len(arr))
        await websocket.send_json(
            {
                'alerts': arr
            }
        )
        await asyncio.sleep(5)

@app.websocket("/getAlerts")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await fetch_logs(websocket)

@app.get("/getServices")
async def get_services():
    query = {
        "size": 10000,
        "query": {
            "match_all": {}
        }
    }
    resp = await client.search(
        index="log*",
        body=query
    )

    hits = resp.get('hits', {}).get('hits', [])
    ids = [hit['_source']['id'] for hit in hits]
    services = [hit['_source']['service'] for hit in hits]

    # get unique combination of ids and services
    unique_services = []
    for i in range(len(ids)):
        obj = {
            'id': ids[i],
            'service': services[i]
        }
        if  obj not in unique_services:
            unique_services.append(obj)
    return unique_services
