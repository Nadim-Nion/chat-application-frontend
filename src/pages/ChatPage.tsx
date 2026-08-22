import { ArrowLeft, MoreVertical, Users } from "lucide-react";
import { useMemo, useState } from "react";
import ConversationList from "../components/chat/ConversationList";
// import MessageInput from "../components/chat/MessageInput";
// import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";
import MessageList from "../components/chat/MessageList";
import { Avatar } from "../components/common/Avatar";
import {
  type Conversation,
  conversations,
  currentUser,
  messages,
} from "../data/mockData";

const ChatPage = () => {
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(conversations[0]);

  const [search, setSearch] = useState("");
  const [mobileListOpen, setMobileListOpen] = useState(true);

  const activeMessages = useMemo(() => {
    if (!activeConversation) {
      return [];
    }

    return messages[activeConversation.id] ?? [];
  }, [activeConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setMobileListOpen(false);
  };

  const handleBack = () => {
    setMobileListOpen(true);
  };

  return (
    <div className="chat-layout">
      <div
        className={`conversation-panel ${
          mobileListOpen ? "mobile-visible" : ""
        }`}
      >
        <ConversationList
          conversations={conversations}
          activeId={activeConversation?.id ?? null}
          search={search}
          onSearchChange={setSearch}
          onSelect={handleSelectConversation}
          onNewChat={() => console.log("New chat")}
          onNewGroup={() => console.log("New group")}
        />
      </div>

      <section
        className={`chat-panel ${!mobileListOpen ? "mobile-visible" : ""}`}
      >
        {activeConversation ? (
          <>
            <header className="chat-header">
              <button
                type="button"
                className="mobile-back-button"
                onClick={handleBack}
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>

              <Avatar name={activeConversation.name} />

              <div className="chat-header-info">
                <h1>{activeConversation.name}</h1>

                <span>
                  {activeConversation.type === "group"
                    ? `${activeConversation.participants.length} participants`
                    : "Online"}
                </span>
              </div>

              <button className="chat-menu-button" type="button">
                {activeConversation.type === "group" ? (
                  <Users size={19} />
                ) : (
                  <MoreVertical size={19} />
                )}
              </button>
            </header>

            <MessageList
              messages={activeMessages}
              currentUserId={currentUser.id}
            />

            <MessageInput
              onSend={(content) => {
                console.log("Send:", content);
              }}
            />
          </>
        ) : (
          <div className="chat-empty">
            <div className="chat-empty-icon">
              <Users size={25} />
            </div>

            <h2>Select a conversation</h2>

            <p>Choose a conversation from the left to start chatting.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatPage;
