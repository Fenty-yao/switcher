"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { List, Input, Button, Divider, NavBar, Space } from "antd-mobile";
import { HeartOutline } from "antd-mobile-icons";
import { addComment } from "@/lib/api";
import type { Comment, Product } from "@/lib/types";
import "./product-detail.sass";

export default function ProductDetailPage() {
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const product: Product = {
    id: "macbook-pro-2020",
    name: "MacBook Pro 2020",
    price: "¥8500",
    description: "M1芯片，13寸，256GB存储",
    image: "/imgs/MacBookPro2020.jpeg",
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const comment: Comment = {
        content: newComment,
        productId: product.id,
        author: "我",
        createtime: new Date().toISOString(),
      };
      try {
        await addComment(comment);
        setComments([...comments, { ...comment }]);
        setNewComment("");
      } catch {
        // Still add locally if API fails
        setComments([...comments, { ...comment }]);
        setNewComment("");
      }
    }
  };

  const handleReply = async (commentId: string) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        content: replyContent,
        productId: product.id,
        author: "我",
        createtime: new Date().toISOString(),
      };
      try {
        await addComment(reply);
      } catch {
        // proceed locally
      }
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? { ...c, replies: [...(c.replies || []), reply] }
            : c
        )
      );
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="app">
      <NavBar onBack={() => router.back()} back="芳群园">
        {product.name}
      </NavBar>
      <div className="body product-detail" style={{ padding: "16px" }}>
        <img src={product.image} alt={product.name} />
        <div>
          自用MacBookPro2022 年 8 千多买的，苹果笔记本电脑 M1 芯片
          <br />
          运行内存 8G
          <br />
          硬盘 256
          <br />
          带touch bar触控条 带指纹解锁
          <br />
          无论工作使用Ps/Pr/Ae还是娱乐看剧都无压力，画质好 音质也很棒
          <br />
          所有功能正常使用，无暗病，全原机带原装充电器，数据线，送保护套和膜，另外还有内胆，可以小刀，砍价勿扰，最好自提！
        </div>
        <Divider>评论区</Divider>

        <div>
          <Input
            placeholder="添加评论"
            value={newComment}
            onChange={(value) => setNewComment(value)}
          />
          <Button
            size="small"
            color="primary"
            onClick={handleAddComment}
            style={{ marginTop: "8px" }}
          >
            发送
          </Button>
        </div>

        <List style={{ marginTop: "16px" }}>
          {comments.map((comment) => (
            <List.Item
              key={comment.id || comment.createtime}
              description={comment.content}
            >
              <Space>
                <span>{comment.author}</span>
                <span style={{ color: "#999", fontSize: "12px" }}>
                  {new Date(comment.createtime).toLocaleString()}
                </span>
              </Space>
              {replyingTo === comment.id ? (
                <div style={{ marginTop: "8px" }}>
                  <Input
                    placeholder="回复评论..."
                    value={replyContent}
                    onChange={(value) => setReplyContent(value)}
                  />
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleReply(comment.id!)}
                    style={{ marginTop: "4px" }}
                  >
                    回复
                  </Button>
                </div>
              ) : (
                <Button
                  size="small"
                  fill="none"
                  onClick={() => {
                    setReplyingTo(comment.id!);
                    setReplyContent("");
                  }}
                >
                  回复
                </Button>
              )}
              {comment.replies?.map((reply, i) => (
                <div key={i} style={{ paddingLeft: "16px", marginTop: "4px" }}>
                  <span style={{ fontWeight: "bold" }}>{reply.author}:</span>{" "}
                  {reply.content}
                </div>
              ))}
            </List.Item>
          ))}
        </List>
      </div>

      <div className="detail-footer">
        <div className="footer-left">
          <HeartOutline />
          <span style={{ marginLeft: "4px" }}>收藏</span>
        </div>
        <div className="footer-right">
          <Button size="small" color="primary">
            立即购买
          </Button>
          <Button size="small" color="default">
            私聊
          </Button>
        </div>
      </div>
    </div>
  );
}
