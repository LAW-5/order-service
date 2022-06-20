from typing import Optional, Tuple
from locust import HttpUser, LoadTestShape, between, task

CLIENT_ID = "locust"
CLIENT_SECRET = "locust"

USER_CREDENTIAL = {
    "email": "user@example.com",
    "password": "user",
}

class CreateCli(HttpUser):
    wait_time = between(15, 30)
    token = None

    def on_start(self):
        res = self.client.post("/auth/login", json=USER_CREDENTIAL, timeout=15)
        self.token = res.json()["token"]

    @task()
    def get_order_history(self):
        self.client.get("/order/user", headers={"Authorization": f"Bearer {self.token}"}, timeout=15)

    @task()
    def get_carts(self):
        self.client.get("/cart", headers={"Authorization": f"Bearer {self.token}"}, timeout=15)

class StagesShape(LoadTestShape):
    stages = [
        {"time": 120, "users": 50, "spawn_rate": 10},
        {"time": 300, "users": 100, "spawn_rate": 10},
        {"time": 420, "users": 300, "spawn_rate": 50},
        {"time": 600, "users": 300, "spawn_rate": 50},
        {"time": 720, "users": 500, "spawn_rate": 100},
        {"time": 900, "users": 500, "spawn_rate": 100},
        {"time": 1020, "users": 1000, "spawn_rate": 100},
        {"time": 1200, "users": 1000, "spawn_rate": 100},
        {"time": 1260, "users": 0, "spawn_rate": 100},
    ]
    def tick(self) -> Optional[Tuple[int, float]]:
        run_time = self.get_run_time()
        for stage in self.stages:
            if run_time < stage["time"]:
                return stage["users"], stage["spawn_rate"]
        return None