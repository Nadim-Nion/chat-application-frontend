import { Send } from "lucide-react";
import { type FormEvent, type KeyboardEvent, useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

const MessageInput = ({ onSend }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const submit = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        rows={1}
        aria-label="Message"
      />

      <button
        type="submit"
        disabled={!message.trim()}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;
