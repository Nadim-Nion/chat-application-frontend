import { Plus, Search } from "lucide-react";
// import { Conversation } from "../../data/mockData";
import { Avatar } from "../common/Avatar";
import type { Conversation } from "../../data/mockData";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (conversation: Conversation) => void;
  onNewChat: () => void;
  onNewGroup: () => void;
}

const ConversationList = ({
  conversations,
  activeId,
  search,
  onSearchChange,
  onSelect,
  onNewChat,
  onNewGroup,
}: ConversationListProps) => {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside className="conversation-sidebar">
      <div className="sidebar-heading">
        <h2>Conversations</h2>
      </div>

      <div className="conversation-search">
        <Search size={18} />

        <input
          type="search"
          placeholder="Search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="conversation-items">
        {filteredConversations.length === 0 ? (
          <div className="conversation-empty">
            <p>No conversations found.</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              className={`conversation-item ${
                activeId === conversation.id ? "active" : ""
              }`}
              onClick={() => onSelect(conversation)}
            >
              <Avatar name={conversation.name} />

              <div className="conversation-content">
                <div className="conversation-name">{conversation.name}</div>

                <div className="conversation-preview">
                  {conversation.type === "group"
                    ? `${conversation.participants.length} participants`
                    : "Start a conversation"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="sidebar-actions">
        <button type="button" className="secondary-action" onClick={onNewChat}>
          <Plus size={17} />
          New Chat
        </button>

        <button type="button" className="primary-action" onClick={onNewGroup}>
          <Plus size={17} />
          New Group
        </button>
      </div>
    </aside>
  );
};

export default ConversationList;
