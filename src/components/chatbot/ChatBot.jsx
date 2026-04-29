import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "안녕하세요!\n 저는 페스티고 AI Guide에요.\n전국 축제 정보를 알려드릴게요.\n무엇이든 물어보세요!",
      time: getCurrentTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = ["🌸 봄 축제 추천", "👨‍👩‍👧 가족 축제", "📍 서울 축제"];

  function getCurrentTime() {
    const now = new Date();
    const h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "오후" : "오전";
    const hour = h > 12 ? h - 12 : h;
    return `${ampm} ${hour}:${m}`;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://43.201.101.12:8000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        text: data.answer,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: "잠시 후 다시 시도해주세요.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <div className={styles.wrapper}>
      {/* 팝업 채팅창 */}
      {isOpen && (
        <div className={styles.popup}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.headerLogo}>
              <CherryBlossomIcon size={50} speed="fast" />
            </div>
            <div className={styles.headerInfo}>
              <div className={styles.headerName}>FestiGo</div>
              <div className={styles.headerStatus}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>축제 전문 안내원</span>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* 채팅 바디 */}
          <div className={styles.body}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.type === "ai" ? styles.msgAi : styles.msgUser}
              >
                {msg.type === "ai" && (
                  <div className={styles.avatar}>
                    <CherryBlossomIcon size={32} speed="none" />
                  </div>
                )}
                <div>
                  <div
                    className={
                      msg.type === "ai" ? styles.bubbleAi : styles.bubbleUser
                    }
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                  <div
                    className={styles.msgTime}
                    style={msg.type === "user" ? { textAlign: "right" } : {}}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* 타이핑 인디케이터 */}
            {isLoading && (
              <div className={styles.msgAi}>
                <div className={styles.avatar}>
                  <CherryBlossomIcon size={28} speed="none" />
                </div>
                <div className={styles.typingBubble}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 빠른 질문 버튼 */}
          <div className={styles.quickBtns}>
            {quickQuestions.map((q) => (
              <button
                key={q}
                className={styles.quickBtn}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>

          {/* 입력창 */}
          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              type="text"
              placeholder="축제에 대해 물어보세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 트리거 버튼 */}
      <div className={styles.triggerWrap}>
        {!isOpen && <div className={styles.tooltip}>무엇이든 물어보세요!</div>}
        <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
          <CherryBlossomIcon size={88} speed="slow" />
          <span className={styles.badge} />
        </button>
      </div>
    </div>
  );
};

/* 벚꽃 캐릭터 SVG */
const CherryBlossomIcon = ({ size, speed }) => {
  const duration =
    speed === "fast"
      ? "4s"
      : speed === "slow"
        ? "6s"
        : speed === "none"
          ? "0s"
          : "5s";
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="22" fill="#111827" />

      {/* 바깥 꽃잎 */}
      <g
        style={{
          transformOrigin: "22px 22px",
          animation: `petalSpin ${duration} linear infinite`,
        }}
      >
        <ellipse
          cx="22"
          cy="7.5"
          rx="5"
          ry="8"
          fill="#f9a8d4"
          opacity="0.9"
          transform="rotate(0 22 22)"
        />
        <ellipse
          cx="22"
          cy="7.5"
          rx="5"
          ry="8"
          fill="#ec4899"
          opacity="0.75"
          transform="rotate(72 22 22)"
        />
        <ellipse
          cx="22"
          cy="7.5"
          rx="5"
          ry="8"
          fill="#f9a8d4"
          opacity="0.9"
          transform="rotate(144 22 22)"
        />
        <ellipse
          cx="22"
          cy="7.5"
          rx="5"
          ry="8"
          fill="#ec4899"
          opacity="0.75"
          transform="rotate(216 22 22)"
        />
        <ellipse
          cx="22"
          cy="7.5"
          rx="5"
          ry="8"
          fill="#f9a8d4"
          opacity="0.9"
          transform="rotate(288 22 22)"
        />
      </g>

      {/* 얼굴 배경 */}
      <circle cx="22" cy="22" r="10" fill="#fff5f7" />
      <circle cx="22" cy="22" r="9" fill="#fce7f3" />

      {/* 얼굴 표정 */}
      <g style={{ animation: "faceBob 2s ease-in-out infinite" }}>
        <ellipse cx="19" cy="21" rx="1.5" ry="1.7" fill="#2d1a1a" />
        <ellipse cx="25" cy="21" rx="1.5" ry="1.7" fill="#2d1a1a" />
        <circle cx="19.6" cy="20.2" r="0.5" fill="white" />
        <circle cx="25.6" cy="20.2" r="0.5" fill="white" />
        <path
          d="M19.5 24 Q22 26 24.5 24"
          stroke="#e879a0"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse
          cx="17"
          cy="23.5"
          rx="2.5"
          ry="1.5"
          fill="#fda4af"
          style={{
            animation: "blushPulse 2s ease-in-out infinite",
            opacity: 0.6,
          }}
        />
        <ellipse
          cx="27"
          cy="23.5"
          rx="2.5"
          ry="1.5"
          fill="#fda4af"
          style={{
            animation: "blushPulse 2s ease-in-out infinite 0.5s",
            opacity: 0.6,
          }}
        />
      </g>

      {/* 꽃술 */}
      <circle cx="22" cy="16" r="1.1" fill="#c9a96e" opacity="0.9" />
      <circle cx="19" cy="17.5" r="0.9" fill="#c9a96e" opacity="0.8" />
      <circle cx="25" cy="17.5" r="0.9" fill="#c9a96e" opacity="0.8" />
    </svg>
  );
};

export default ChatBot;
