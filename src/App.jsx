import { Fragment, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSubmit() {
    try {
      const res = await axios.post(
        "https://chatbot-gdgoc.up.railway.app/chatbot/send-message",
        {
          userInput: input,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzN2E5ZDE1LTJmNDAtNGU3Yi1hZWRhLWQyMTM2YjgwZjkxYSIsImVtYWlsIjoiZ2Rnb2NAZXNhdW5nZ3VsLmFjLmlkIiwiaWF0IjoxNzQwNjQ2Nzk5fQ.R9Zi87rCssGGz9Wvbep_w5DF7Ka6O7V3N-F6pdgOWMo",
          },
        }
      );

      console.log(res.data, res.data.data);

      setMessages([
        ...messages,
        {
          input: input,
          reply: res.data.data.botReply,
        },
      ]);
      setInput(""); // Clear input after is
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  }

  return (
    <div>
      <div className="max-w-2xl w-full flex flex-col gap-4 pb-32">
        {messages.map((message, index) => (
          <Fragment key={index}>
            <div className="flex justify-end">
              <p className="bg-white/10 p-3 rounded-2xl">{message.input}</p>
            </div>

            <div className="flex justify-start">
              <p className="bg-stone-700 p-3 rounded-2xl">{message.reply}</p>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="bg-stone-800 fixed bottom-0 left-0 right-0">
        <div className="flex items-center max-w-2xl w-full p-4 mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white/10 rounded-2xl p-3 resize-none field-sizing-content max-h-24 text-red-300 flex-1 mr-2"
            placeholder="Enter your text here"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-stone-700 text-white px-4 py-3 rounded-xl whitespace-nowrap min-w-16 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
