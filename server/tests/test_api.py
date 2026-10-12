import requests
from starlette.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200


def test_empty_question_is_rejected():
    response = client.post("/api/chat", json={"question": ""})
    assert response.status_code == 422


def test_whitespace_question_is_rejected():
    response = client.post("/api/chat", json={"question": "   "})
    assert response.status_code == 400


def test_ollama_unavailable_returns_503(monkeypatch):
    def mock_post(*args, **kwargs):
        raise requests.ConnectionError("Ollama unavailable")

    monkeypatch.setattr(requests, "post", mock_post)

    response = client.post(
        "/api/chat",
        json={"question": "How can a product improve activation?"},
    )

    assert response.status_code == 503
    assert "unavailable" in response.json()["detail"].lower()