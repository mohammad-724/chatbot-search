const queryInput = document.getElementById("queryInput");
const searchButton = document.getElementById("searchButton");
const messages = document.getElementById("messages");
const loading = document.getElementById("loading");
const newChatButton = document.getElementById("newChatButton");


/* =========================
   EXAMPLE QUERY
========================= */

function useExample(text) {
    queryInput.value = text;
    queryInput.focus();

    autoResize();
}


/* =========================
   USER MESSAGE
========================= */

function createUserMessage(text) {

    const wrapper = document.createElement("div");

    wrapper.className = "message user-message";

    wrapper.innerHTML = `
        <div class="message-avatar">U</div>

        <div class="bubble">
            <div class="answer-text"></div>
        </div>
    `;

    wrapper.querySelector(".answer-text").textContent = text;

    messages.appendChild(wrapper);

    scrollToBottom();
}


/* =========================
   BOT MESSAGE
========================= */

function createBotMessage(answer, sources) {

    const wrapper = document.createElement("div");

    wrapper.className = "message bot-message";

    const avatar = document.createElement("div");

    avatar.className = "message-avatar";

    avatar.textContent = "X";


    const bubble = document.createElement("div");

    bubble.className = "bubble";


    /* ANSWER */

    const answerText = document.createElement("div");

    answerText.className = "answer-text";

    answerText.textContent = answer;

    bubble.appendChild(answerText);


    /* COPY BUTTON */

    const copyButton = document.createElement("button");

    copyButton.className = "copy-btn";

    copyButton.textContent = "Copy answer";

    copyButton.onclick = async () => {

        try {

            await navigator.clipboard.writeText(answer);

            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy answer";
            }, 1500);

        } catch {
            copyButton.textContent = "Copy failed";
        }
    };

    bubble.appendChild(copyButton);


    /* SOURCES */

    if (sources && sources.length > 0) {

        const sourcesContainer = document.createElement("div");

        sourcesContainer.className = "sources";


        const title = document.createElement("div");

        title.className = "sources-title";

        title.textContent =
            `Sources · ${sources.length}`;

        sourcesContainer.appendChild(title);


        sources.forEach((source) => {

            const sourceDiv =
                document.createElement("div");

            sourceDiv.className = "source";


            const link =
                document.createElement("a");

            link.href = source.url || "#";

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.textContent =
                source.title || "Untitled source";


            const description =
                document.createElement("p");

            description.textContent =
                source.content
                    ? source.content.slice(0, 160) + "..."
                    : "Web source";


            sourceDiv.appendChild(link);

            sourceDiv.appendChild(description);

            sourcesContainer.appendChild(sourceDiv);

        });


        bubble.appendChild(sourcesContainer);
    }


    wrapper.appendChild(avatar);

    wrapper.appendChild(bubble);

    messages.appendChild(wrapper);

    scrollToBottom();
}


/* =========================
   SEARCH
========================= */

async function performSearch() {

    const query = queryInput.value.trim();

    if (!query) {
        queryInput.focus();
        return;
    }


    /* Hide welcome screen */

    const welcome =
        document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }


    createUserMessage(query);


    queryInput.value = "";

    autoResize();


    searchButton.disabled = true;

    loading.classList.remove("hidden");


    try {

        const response =
            await fetch("/api/search", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    query: query
                })
            });


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error || "Search failed."
            );
        }


        createBotMessage(
            data.answer,
            data.sources
        );


    } catch (error) {

        createBotMessage(
            "Sorry, I couldn't complete the search. " +
            error.message,
            []
        );

    } finally {

        loading.classList.add("hidden");

        searchButton.disabled = false;

        queryInput.focus();
    }
}


/* =========================
   NEW CHAT
========================= */

newChatButton.addEventListener(
    "click",
    () => {

        location.reload();

    }
);


/* =========================
   ENTER KEY
========================= */

queryInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            performSearch();
        }
    }
);


/* =========================
   TEXTAREA AUTO RESIZE
========================= */

function autoResize() {

    queryInput.style.height = "auto";

    queryInput.style.height =
        Math.min(
            queryInput.scrollHeight,
            120
        ) + "px";
}


queryInput.addEventListener(
    "input",
    autoResize
);


/* =========================
   SCROLL
========================= */

function scrollToBottom() {

    setTimeout(() => {

        const chatArea =
            document.querySelector(".chat-area");

        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: "smooth"
        });

    }, 50);
}