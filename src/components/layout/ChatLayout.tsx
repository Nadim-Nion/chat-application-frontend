import { MessageCircle } from "lucide-react";
import { Outlet } from "react-router";

const ChatLayout = () => {
  return (
    <div className="chat-app">
      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo">
            <MessageCircle size={20} />
          </div>

          <span>ChatApp</span>
        </div>

        <div className="topbar-user">
          <span>Nion</span>

          <button type="button">Logout</button>
        </div>
      </header>

      <main className="chat-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
