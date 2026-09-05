live url: https://my-chatbot-search.onrender.com


# ConnectX – AI Web Search Chatbot

ConnectX is a lightweight web-based chatbot that searches the web and provides concise AI-generated answers with source links. It was built using Python, Flask, HTML, CSS, JavaScript, and the Tavily Search API.

## Features

- Modern responsive chatbot UI
- Real-time web search
- AI-generated summarized answers
- Source links for verification
- New Chat option
- Copy answer button
- Example prompts
- Enter-to-search support
- Mobile-responsive design
- Ready for cloud deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python, Flask |
| Web Search / AI Answer | Tavily Search API |
| Environment Variables | python-dotenv |
| Production Server | Gunicorn |
| Version Control | Git, GitHub |
| Deployment | Render |

## How It Works

```text
User enters a question
        ↓
ConnectX Frontend
        ↓
Flask Backend (/api/search)
        ↓
Tavily Search API
        ↓
Web results + AI-generated answer
        ↓
ConnectX displays answer + sources
```

## Project Structure

```text
search-chatbot/
│
├── app.py                  # Flask backend and search API
├── requirements.txt        # Python dependencies
├── .env                    # API key (local only)
├── .env.example            # Environment variable template
├── .gitignore              # Git exclusions
├── .python-version         # Python version for deployment
│
├── templates/
│   └── index.html          # Main chatbot page
│
└── static/
    ├── style.css           # UI styling and responsive design
    └── script.js           # Chat and search logic
```

## Requirements

- Python 3.10.3 or compatible supported Python version
- Git
- Tavily API key
- Internet connection

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/connectx.git
cd connectx
```

### 2. Create and activate a virtual environment

Windows CMD:

```cmd
python -m venv venv
venv\Scripts\activate
```

PowerShell, if script execution is restricted:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

## Tavily API Setup

Create a `.env` file in the project root:

```env
TAVILY_API_KEY=your_tavily_api_key
```

The application loads the key using `python-dotenv`.

**Never commit `.env` or expose your API key publicly.**

## Run Locally

Start the Flask server:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## API Endpoint

ConnectX uses:

```text
POST /api/search
```

Example request:

```json
{
  "query": "What is Python?"
}
```

A successful response contains:

```json
{
  "success": true,
  "query": "What is Python?",
  "answer": "AI-generated summarized answer...",
  "sources": [
    {
      "title": "Source title",
      "url": "https://example.com",
      "content": "Source summary..."
    }
  ]
}
```

## Backend Testing

Windows CMD:

```cmd
curl -X POST http://127.0.0.1:5000/api/search ^
-H "Content-Type: application/json" ^
-d "{"query":"What is Python?"}"
```

A successful response should contain:

```json
"success": true
```

## Deployment on Render

Push the project to GitHub and create a **Web Service** on Render.

Use:

```text
Build Command:
pip install -r requirements.txt

Start Command:
gunicorn app:app
```

Add this environment variable in Render:

```text
TAVILY_API_KEY=your_tavily_api_key
```

Do not upload `.env` to GitHub.

## Security

- API keys are stored in environment variables.
- `.env` is excluded through `.gitignore`.
- The Tavily API key is not exposed in frontend JavaScript.
- Search requests go through the Flask backend.

## Future Improvements

- Chat history and persistent conversations
- Dark mode
- Markdown-formatted answers
- Voice input/output
- User authentication
- Advanced search filters
- Saved searches
- Multiple AI/search providers

## Learning Outcomes

This project demonstrates:

- Python and Flask backend development
- REST API integration
- Web search API integration
- Frontend-backend communication using JavaScript `fetch()`
- JSON request/response handling
- Environment variable management
- Git/GitHub workflow
- Cloud deployment using Render

## Author

**Mohammad Azmath Ali**

Built as a practical full-stack AI/web-search project.
