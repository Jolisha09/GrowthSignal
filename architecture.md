# GrowthSignal — Architecture

## 1. Overview

GrowthSignal is a full-stack product-growth research assistant. It provides a React-based interface, a FastAPI backend, and a locally hosted language model through Ollama.

The current implementation supports submitting questions to a local Qwen model and displaying its responses. Transcript retrieval, persistent sessions, and source-grounded answers are planned extensions.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Python, FastAPI |
| Local LLM runtime | Ollama |
| Local model | Qwen 2.5 3B |
| HTTP communication | Axios |
| Request validation | Pydantic |
| Version control | Git and GitHub |

## 3. High-Level Architecture

```text
User
  |
  v
React Frontend (Vite)
  |
  | HTTP POST /api/chat
  v
FastAPI Backend
  |
  | HTTP POST /api/generate
  v
Ollama Runtime
  |
  v
Qwen 2.5 3B
  |
  v
Generated Response
  |
  v
React Answer Panel
```

## 4. Request Flow

1. The user enters a product or growth question in the React interface.
2. The frontend sends the question to the FastAPI `/api/chat` endpoint.
3. Pydantic validates the request.
4. FastAPI constructs a prompt and forwards it to Ollama.
5. Qwen generates a response locally.
6. The backend returns the answer and model metadata.
7. The frontend displays the answer or an appropriate error message.

## 5. API Contracts

### GET `/`

Returns basic API information.

### GET `/health`

Provides a basic health response from the backend. This does not, by itself, guarantee that Ollama or the model is available.

### POST `/api/chat`

Request:

```json
{
  "question": "How can a product improve user activation?"
}
```

Successful response shape:

```json
{
  "answer": "Generated model response",
  "model": "qwen2.5:3b",
  "mode": "local",
  "sources": [],
  "grounded": false
}
```

The response fields indicate that the current answer comes from the local model, without verified transcript citations.

## 6. Configuration

The backend currently reads the Ollama URL and model name from environment variables when available:

- `OLLAMA_URL`: Ollama API base URL.
- `OLLAMA_MODEL`: Model identifier.

Defaults are provided for local development. A complete configuration layer for switching between local and cloud providers remains to be implemented.

## 7. Error Handling and Observability

- Invalid or empty questions are rejected.
- Ollama request failures return an HTTP 503 response.
- Backend errors are logged using Python logging.
- The frontend displays an error when the API request fails.

Timeouts and database failures require further testing as the application expands.

## 8. Planned Extensions

### Knowledge Retrieval
Ingest authorized Lenny's Podcast and Newsletter material, split documents into chunks, index them, retrieve relevant passages, and attach source references to answers.

### Agent Integration
Integrate a required coding/agent framework and define the assistant's tool-use and response workflow.

### Persistence
Add PostgreSQL tables for users or session metadata, conversations, messages, timestamps, and relevant metadata.

### Provider Switching
Support both local Ollama and a cloud provider through configuration, with documented fallback behavior.

### Essay Generation
Add a dedicated Ship 30 for 30-style writing workflow with structured Markdown output and evidence-based claims.

### Artifact Viewer
Render Markdown and supported HTML artifacts in an isolated, restricted viewer. Treat generated HTML as untrusted input.

## 9. Security Considerations

- Keep API keys and secrets out of source control.
- Validate incoming requests.
- Avoid exposing internal errors or secrets in user-facing responses.
- Sanitize or isolate generated HTML.
- Do not present model-generated statements as verified research without supporting evidence.

## 10. Current Limitations

The current version does not yet provide transcript RAG, verified source citations, PostgreSQL persistence, complete session memory, cloud-provider switching, the required agent integration, or a complete artifact viewer. These are implementation requirements rather than completed features.