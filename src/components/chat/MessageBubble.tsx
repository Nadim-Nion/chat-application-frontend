import { type Message } from "../../data/mockData";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={`message-row ${isOwn ? "own" : "received"}`}>
      <div className="message-bubble">
        <p>{message.content}</p>

        <time>{time}</time>
      </div>
    </div>
  );
};

export default MessageBubble;
