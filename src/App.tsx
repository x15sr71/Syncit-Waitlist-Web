/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Input } from "./components/ui/input";

const SpotifyThemedLanding = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email) {
      setResponseMessage("Please enter a valid email.");
      return;
    }
    
    try {
      const response = await fetch("https://api.syncit.org.in/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        setEmail("");
        setResponseMessage("🎉 You're on the VIP list! We'll be in touch soon.");
      } else {
        setResponseMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Connection issue. Please try again.");
    }
  };
  

  const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsHovered(true);
      handleJoinWaitlist();
      setTimeout(() => {
        setIsHovered(false);
      }, 200);
    }
  };

  const handleButtonTouch = () => {
    setIsTouched(true);
    setTimeout(() => setIsTouched(false), 300);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center font-sans px-4"
      style={{
        background:
          "linear-gradient(135deg, #00ccff, #6600ff, #ff0077, #00ffcc, #ff00ff, #00ccff)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      <div className="text-center text-white bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl max-w-lg w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide uppercase text-spotify-green">
          SyncIt
        </h1>
        <p className="text-md md:text-lg text-spotify-gray font-light mb-6 md:mb-8">
          Migrate. Sync. Vibe.<br />
          Effortless playlist harmony across all your platforms
        </p>

        <div className="flex flex-col gap-4 md:gap-6 items-center">
          <Input
            type="email"
            placeholder="Your best email for early access"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            className="rounded-full px-6 py-4 md:px-8 md:py-6 border-none bg-black/40 text-white placeholder:text-spotify-gray 
                       focus-visible:ring-spotify-green focus-visible:ring-2 font-medium w-full max-w-md"
          />
          <button
            onClick={handleJoinWaitlist}
            onTouchStart={handleButtonTouch}
            className={`text-black font-bold py-3 md:py-4 px-10 md:px-12 rounded-full 
                       uppercase tracking-widest text-sm transition-colors duration-200 flex items-center gap-3 w-full md:w-auto justify-center
                       ${isHovered || isTouched ? "bg-[#1ED760]" : "bg-spotify-green hover:bg-[#1ED760]"}`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Claim Early Access
          </button>

          {responseMessage && (
            <p
              key={responseMessage}
              className={`text-sm font-medium ${
                responseMessage.includes("touch") ||
                responseMessage.includes("soon.")
                  ? "text-spotify-green"
                  : "text-red-500"
              } animate-fade-in`}
            >
              {responseMessage}
            </p>
          )}
        </div>

        <p className="mt-6 md:mt-8 text-spotify-gray text-xs md:text-sm">
          Join thousands syncing effortlessly
        </p>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
          @keyframes gradientBG {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default SpotifyThemedLanding;