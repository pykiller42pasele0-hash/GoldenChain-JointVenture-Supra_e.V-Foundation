# 0ms Mathematical State Machine - Global Root
import json, time
class StateMachine:
    def __init__(self):
        self.state = "GENESIS"
        self.ping = 0.0
    def sync(self):
        return {"status": "PARITY", "latency": self.ping}
if __name__ == "__main__":
    engine = StateMachine()
    print(json.dumps(engine.sync())
