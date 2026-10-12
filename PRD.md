
# Product Requirements Document (PRD)
## GrowthSignal — The Lenny Growth Assistant

### 1. Discovery Brief

#### User and Problem
The primary users are product managers, startup founders, and growth teams who need practical insights from Lenny's Podcast and newsletter. Manually finding relevant transcript sections and turning them into actionable content takes time. GrowthSignal aims to simplify this process through a conversational interface.

#### Success Metrics
- The local demo starts successfully using documented instructions.
- The assistant returns a response to a valid question.
- Retrieved answers identify their supporting transcript sources.
- Invalid requests and unavailable model services return understandable errors.

The source-grounded retrieval metric is a target for future implementation, not a currently verified capability.

#### Assumptions
- Users primarily ask product management, startup, and growth questions.
- The local demo must use Ollama.
- A small local model is appropriate for the initial prototype.
- Generated answers must not be presented as transcript-grounded without supporting evidence.

#### Scope
**Current MVP**
- React-based research interface.
- FastAPI health and chat endpoints.
- Local Qwen 2.5 3B inference through Ollama.

**Planned**
- Transcript ingestion and retrieval.
- Source citations and conversation sessions.
- PostgreSQL persistence.
- Agent SDK integration and cloud/local model selection.
- Ship 30 for 30 essay generation.
- In-app artifact viewer with isolated rendering.

### 2. User Stories
- As a product manager, I want to ask growth questions in natural language.
- As a researcher, I want answers linked to relevant source transcripts.
- As a writer, I want to turn research into a structured essay.
- As a user, I want generated Markdown or HTML artifacts displayed inside the application.

### 3. Functional Requirements
1. Validate incoming chat requests.
2. Generate responses using the configured local model.
3. Provide a health endpoint.
4. Retrieve relevant transcript chunks and return source references.
5. Maintain independent conversation sessions.
6. Persist conversation history in PostgreSQL.
7. Support local and cloud model configuration.
8. Generate essays using a dedicated writing skill.
9. Render artifacts safely within the application.

Requirements 4–9 are not yet implemented in the current MVP.

### 4. Non-Functional Requirements
- Clear API contracts and error messages.
- Responsive and accessible interface.
- No committed credentials or secrets.
- Observable failures and useful troubleshooting logs.
- Reproducible setup for a fresh evaluator.

### 5. Risks and Trade-offs
- **Hallucination:** Local model responses may contain unsupported claims.
- **Latency:** Inference speed depends on available hardware.
- **Retrieval quality:** Poor chunking can return irrelevant passages.
- **Privacy:** Local inference reduces dependence on external inference services, but does not replace application security.
- **Artifact security:** Generated HTML must be treated as untrusted and isolated before rendering.
- **Scope:** Under a short deadline, a verified MVP is preferable to falsely claiming unfinished functionality is complete.

### 6. Acceptance Criteria
- A fresh evaluator can follow the documented setup.
- The frontend can reach the FastAPI backend.
- A valid question returns a local-model response.
- Model failures are handled gracefully.
- Future grounded-answer functionality must cite retrieved sources and acknowledge insufficient evidence.

### 7. Implementation Plan
1. Build the frontend and API.
2. Integrate local Ollama inference.
3. Implement transcript ingestion and retrieval.
4. Add sessions, PostgreSQL, and agent routing.
5. Implement essay generation and secure artifact rendering.
6. Add tests, documentation, and demo instructions.
