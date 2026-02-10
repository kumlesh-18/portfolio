# Portfolio Chatbot Architecture

> AI-powered chatbot using Groq API with personalized knowledge of Kumlesh Kumar's portfolio

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      User Interface                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   ChatWidget (Floating Button + Chat Panel)              │  │
│  │   - Message bubbles (user/assistant)                     │  │
│  │   - Input field with send button                        │  │
│  │   - Typing indicator                                    │  │
│  │   - Minimize/Maximize toggle                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js API Route                           │
│  /api/chat                                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  1. Validate request                                      │  │
│  │  2. Load knowledge base (system prompt)                   │  │
│  │  3. Send to Groq API                                      │  │
│  │  4. Stream response back to client                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Groq API (LLM Backend)                      │
│  - Model: llama-3.3-70b-versatile (or mixtral-8x7b-32768)     │
│  - Ultra-fast inference                                        │
│  - System prompt contains full knowledge base                  │
└─────────────────────────────────────────────────────────────────┘
```

## Architecture Decisions

### 1. Knowledge Base Strategy

**Option A: Context Injection (Selected)**

- Inject all portfolio data into the system prompt
- Simple, no vector DB needed
- Works well for small knowledge base (< 8K tokens)

**Option B: RAG (Retrieval Augmented Generation)**

- Use embeddings + vector search
- Required for large knowledge bases
- More complex setup

**Decision**: Use Option A - your portfolio data fits within context limits

### 2. API Provider: Groq

**Why Groq:**

- 10x faster than other LLM providers
- Free tier available
- Supports streaming
- Great for real-time chat

### 3. Streaming vs Non-Streaming

**Selected: Streaming**

- Better UX (see response as it generates)
- Lower perceived latency
- Uses Server-Sent Events (SSE)

## Data Flow

```
1. User clicks chat widget → Opens chat panel
2. User types message → Sends to /api/chat
3. API route:
   a. Builds context from knowledge base
   b. Appends user message to conversation history
   c. Calls Groq API with streaming
   d. Streams response back to client
4. Client renders response incrementally
5. Conversation history maintained in client state
```

## File Structure

```
src/
├── app/
│   └── api/
│       └── chat/
│           └── route.ts        # API endpoint
├── components/
│   └── chat/
│       ├── ChatWidget.tsx      # Main floating widget
│       ├── ChatPanel.tsx       # Chat window
│       ├── ChatMessage.tsx     # Individual message
│       ├── ChatInput.tsx       # Input field
│       └── index.ts            # Exports
├── lib/
│   ├── groq.ts                 # Groq client setup
│   └── knowledge-base.ts       # Portfolio knowledge
└── types/
    └── chat.ts                 # Chat types
```

## Knowledge Base Content

The chatbot will have knowledge of:

### Personal Information

- Name: Kumlesh Kumar
- Title: Junior Machine Learning Engineer
- Location: Berhampur, Ganjam, India
- Contact: email, phone, LinkedIn, GitHub

### Education

- B.Tech CSE (Data Science) at NIST (2024-2028)
- XII Science from St. Xavier's (2020-2022)

### Experience

- Data Science Trainee (6 months)
- Junior ML Intern (4 months)

### Projects (Detailed)

1. **Customer Churn Prediction System**
   - Problem: Predict customer churn
   - Tech: Python, Pandas, Scikit-learn
   - Models: Logistic Regression, Random Forest
   - Key insights: Feature engineering, hyperparameter tuning

2. **House Price Prediction System**
   - Problem: Real estate price estimation
   - Tech: Python, Linear Regression, Random Forest
   - Metrics: RMSE, Cross-validation

3. **Handwritten Digit Recognition**
   - Problem: CNN for MNIST classification
   - Tech: TensorFlow/PyTorch, CNN architecture

### Publications

- Customer Churn Analysis paper
- Real Estate Price Prediction paper

### Skills (Comprehensive)

- Programming: Python, NumPy, Pandas, SQL
- ML: Regression, Classification, Clustering
- Deep Learning: CNN, TensorFlow, PyTorch
- Evaluation: Accuracy, F1, Cross-validation

### Courses

- Applied ML in Python (University of Michigan)
- ML with Python (Coursera)

## System Prompt Template

```
You are an AI assistant for Kumlesh Kumar's portfolio website. You have
comprehensive knowledge of Kumlesh's skills, projects, experience, and
publications.

Your role:
- Answer questions about Kumlesh's background and qualifications
- Explain his projects in detail
- Discuss his technical skills and expertise
- Help recruiters and visitors understand his capabilities
- Be helpful, professional, and concise

Knowledge Base:
[FULL PORTFOLIO DATA INJECTED HERE]

Guidelines:
- Be conversational but professional
- Provide specific details when asked
- Recommend relevant projects based on interests
- Offer to elaborate on any topic
- If asked something not in your knowledge, politely say you don't have that information
- Do not make up information not in the knowledge base
```

## Security Considerations

1. **Rate Limiting**: Implement per-IP rate limiting (10 req/min)
2. **Input Sanitization**: Prevent prompt injection
3. **API Key Protection**: Use environment variables
4. **Message Length Limits**: Max 500 chars per message
5. **Conversation History Limit**: Max 20 messages

## API Specification

### POST /api/chat

**Request:**

```json
{
  "message": "Tell me about your projects",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! How can I help?" }
  ]
}
```

**Response (Streaming):**

```
data: {"content": "I have "}
data: {"content": "worked on "}
data: {"content": "several ML projects..."}
data: [DONE]
```

## Environment Variables

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
```

## Implementation Phases

### Phase 1: Core Setup

- [ ] Install dependencies (groq-sdk)
- [ ] Create knowledge base file
- [ ] Setup Groq client

### Phase 2: API Route

- [ ] Create /api/chat endpoint
- [ ] Implement streaming response
- [ ] Add rate limiting

### Phase 3: UI Components

- [ ] ChatWidget (floating button)
- [ ] ChatPanel (chat window)
- [ ] ChatMessage (message bubbles)
- [ ] ChatInput (input field)

### Phase 4: Integration

- [ ] Add ChatWidget to layout
- [ ] Connect to API
- [ ] Handle streaming in UI

### Phase 5: Polish

- [ ] Add animations
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Loading states

## Performance Targets

| Metric              | Target  |
| ------------------- | ------- |
| Time to First Token | < 500ms |
| Full Response Time  | < 3s    |
| Widget Load Time    | < 100ms |
| Bundle Size Impact  | < 15KB  |

## Future Enhancements

- [ ] Voice input/output
- [ ] Conversation persistence
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Suggested questions
