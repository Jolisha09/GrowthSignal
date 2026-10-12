
# GrowthSignal — Design Specification

## 1. Design Direction
GrowthSignal uses an editorial research-workspace aesthetic rather than a conventional AI dashboard.

The visual identity combines warm paper tones, forest green, muted clay accents, serif headlines, and clean sans-serif body text.

## 2. Design Principles
- Make research and written answers easy to scan.
- Use clear hierarchy instead of decorative effects.
- Keep the interface calm and readable during longer sessions.
- Make system status and errors understandable.
- Distinguish generated content from verified source evidence.

## 3. Color Palette
- Paper: `#F6F1E7`
- Forest green: `#234B3B`
- Clay: `#C66A45`
- Ink: `#292A25`
- Sage: `#D8DCCB`

## 4. Typography
- Headlines: Playfair Display.
- Body and controls: DM Sans.
- Compact uppercase labels for navigation and section metadata.

Fonts are loaded from Google Fonts when network access is available.

## 5. Information Architecture
- Research Desk: Main question-entry workspace.
- Growth Essays: Intended area for generated essays.
- Saved Insights: Intended area for retained research.
- Answer Panel: Displays the local model's response.
- Artifact Viewer: Planned panel for rendered Markdown and HTML.

The first three navigation destinations and the full artifact workflow are not yet implemented as complete features.

## 6. Main User Flow
1. Open the research workspace.
2. Enter a product or growth question.
3. Submit the question to the FastAPI backend.
4. Display the local model's answer or an error message.
5. In the planned grounded workflow, show retrieved source references alongside the answer.

## 7. Interaction States
- Idle: Question composer is ready.
- Loading: The interface indicates that the model is generating.
- Success: The generated answer is displayed.
- Error: A readable error message appears when the API or model is unavailable.

## 8. Responsive Behavior
- Desktop: Persistent sidebar and spacious central content.
- Tablet: Reduced horizontal padding and simplified content layout.
- Mobile: Sidebar content is simplified and cards stack vertically.

## 9. Accessibility
- Use semantic buttons and form controls.
- Provide accessible labels for the question composer.
- Preserve readable text contrast.
- Keep keyboard focus visible.
- Communicate loading and error states clearly.

## 10. Security Considerations
Generated HTML must not be inserted directly into the application's DOM as trusted content. The planned artifact viewer should use an isolated sandboxed iframe with restrictive permissions and no unnecessary script execution.

## 11. Current Limitations
The current interface supports local-model question submission and answer display. Persistent sessions, source citations, and a complete artifact viewer remain future implementation work.
