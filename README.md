# SearchBot – AI-Powered Web Search Assistant

A beginner-friendly Flask chatbot that searches the web using Tavily and displays an AI-generated answer with source links.

## Features

- Simple chat interface
- Web search
- AI-generated search answer
- Source links
- Responsive design
- Flask backend
- Environment-variable API key
- Ready for Render deployment

## 1. Requirements

- Python 3.10 or 3.11
- A Tavily API key
- Internet connection

## 2. Create virtual environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure API key

Copy `.env.example` to `.env`.

### Windows Command Prompt

```bash
copy .env.example .env
```

Then edit `.env`:

```env
TAVILY_API_KEY=tvly-your_real_key
```

Do not upload `.env` to GitHub.

## 5. Run locally

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## 6. Deploy to Render

Push this project to GitHub.

Create a Render Web Service and use:

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
gunicorn app:app
```

Add this environment variable in Render:

```text
TAVILY_API_KEY = your_real_tavily_key
```

## 7. Project structure

```text
search-chatbot/
├── app.py
├── requirements.txt
├── README.md
├── .env.example
├── .gitignore
├── .python-version
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## 8. Troubleshooting

### Missing API key

Make sure `.env` exists beside `app.py` and contains:

```env
TAVILY_API_KEY=tvly-xxxxxxxx
```

### Missing Python package

Activate the virtual environment and run:

```bash
pip install -r requirements.txt
```

### Port issue

On local development, change the fallback port in `app.py` from `5000` to another free port.

## 9. Suggested future upgrades

- Conversation memory
- User accounts
- Search history
- Dark mode
- News search mode
- Image search
- Voice input/output
- PDF/RAG document search
- Better citation formatting
