## AI Chatbot (React)

A production-ready AI chatbot built with React and OpenAI API.

### Features

- Context-aware conversation memory
- Typing indicator & loading states
- Error handling
- Local chat persistence
- Secure API key handling
- Modular, scalable architecture

### Live Demo

Try the chatbot live here:
https://unrivaled-kheer-d5fcb7.netlify.app/

### Tech Stack

- React (Vite)
- OpenAI API
- Axios

### Security

- API keys stored in environment variables
- No secrets committed to repository

### Run locally

npm install  
npm run dev

### Future Improvements

- Authentication
- Backend proxy for API security
- Database persistence
- Voice support

### AI Strategy

This project supports multiple AI modes.
During local development and demos, a mock AI engine is used to avoid API quotas and ensure reliability.
In production, the same interface can be switched to a real LLM provider via environment variables.
