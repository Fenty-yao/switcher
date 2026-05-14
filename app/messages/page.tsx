"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd-mobile";
import Shell from "@/components/Shell";
import { getMessages, type MessageItem } from "@/lib/api";

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    getMessages().then(setMessages);
  }, []);

  return (
    <Shell title="消息列表">
      {messages.map((message) => (
        <Card key={message.id} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={message.avatar}
              style={{ "--size": "80px", margin: "0 auto" } as React.CSSProperties}
            />
            <div style={{ flex: 1, marginLeft: "1rem" }}>
              <div style={{ fontWeight: "bold" }}>{message.name}</div>
              <div style={{ color: "#888", fontSize: "14px" }}>
                {message.lastMessage}
              </div>
            </div>
            <div style={{ color: "#aaa", fontSize: "12px" }}>{message.time}</div>
          </div>
        </Card>
      ))}
    </Shell>
  );
}
