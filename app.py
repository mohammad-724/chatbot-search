import os

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from tavily import TavilyClient

load_dotenv()

app = Flask(__name__)

TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

if not TAVILY_API_KEY:
    raise RuntimeError(
        "TAVILY_API_KEY is missing. Add it to your .env file."
    )

tavily_client = TavilyClient(api_key=TAVILY_API_KEY)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/search", methods=["POST"])
def search():
    try:
        data = request.get_json(silent=True) or {}
        query = str(data.get("query", "")).strip()

        if not query:
            return jsonify({
                "success": False,
                "error": "Please enter a search query."
            }), 400

        if len(query) > 500:
            return jsonify({
                "success": False,
                "error": "Your query is too long."
            }), 400

        response = tavily_client.search(
            query=query,
            search_depth="basic",
            topic="general",
            max_results=5,
            include_answer="basic"
        )

        answer = response.get("answer")

        if not answer:
            answer = (
                "I found relevant web results, but I could not "
                "generate a summarized answer."
            )

        sources = []
        for result in response.get("results", []):
            sources.append({
                "title": result.get("title", "Untitled"),
                "url": result.get("url", ""),
                "content": result.get("content", "")
            })

        return jsonify({
            "success": True,
            "query": query,
            "answer": answer,
            "sources": sources
        })

    except Exception as exc:
        print("ERROR:", exc)
        return jsonify({
            "success": False,
            "error": "Something went wrong while searching. Please try again."
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
