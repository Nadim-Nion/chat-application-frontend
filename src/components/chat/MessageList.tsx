import { useCallback, useEffect, useRef, useState } from "react";
import { type Message } from "../../data/mockData";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isNearBottom, setIsNearBottom] = useState(true);
  const [newMessageCount, setNewMessageCount] = useState(0);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });

  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (isNearBottom) {
        scrollToBottom("smooth");
        setNewMessageCount(0);
      } else {
        setNewMessageCount((count) => count + 1);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [messages.length, isNearBottom, scrollToBottom]);

  const handleScroll = () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const nearBottom = distanceFromBottom < 100;

    setIsNearBottom(nearBottom);

    if (nearBottom) {
      setNewMessageCount(0);
    }
  };

  return (
    <div ref={containerRef} className="message-list" onScroll={handleScroll}>
      {messages.length === 0 ? (
        <div className="messages-empty">
          <div className="messages-empty-icon">💬</div>

          <h2>No messages yet</h2>

          <p>Send a message to start the conversation.</p>
        </div>
      ) : (
        <div className="messages-content">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))}
        </div>
      )}

      {!isNearBottom && newMessageCount > 0 && (
        <button
          type="button"
          className="new-message-indicator"
          onClick={() => scrollToBottom()}
        >
          ↓ {newMessageCount} new{" "}
          {newMessageCount === 1 ? "message" : "messages"}
        </button>
      )}
    </div>
  );
};

export default MessageList;
