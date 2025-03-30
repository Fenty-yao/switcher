import React, { useState } from "react";
import {
  List,
  Input,
  Button,
  Space,
  Divider,
  Footer,
  NavBar,
} from "antd-mobile";
import { HeartOutline } from "antd-mobile-icons";
import { addCommentRequest } from "./product-detail-api";
import "./product-detail.sass";
import { Comment, Product } from "./types";

interface ProductDetailProps {
  product?: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        content: newComment,
        productId: product?.id ?? "",
        author: "我",
        createtime: new Date().toISOString(),
      };
      setComments([...comments, { ...comment }]);
      addCommentRequest(comment);
      setNewComment("");
    }
  };

  const handleReply = (commentId: string) => {
    if (replyContent.trim()) {
      const comment = {
        author: "我",
        content: replyContent,
        productId: product?.id ?? "",
        createtime: new Date().toISOString(),
      };
      setComments(
        comments.map((comment) =>
          comment.id === commentId.toString()
            ? {
                ...comment,
                replies: [...(comment.replies || []), { ...comment }],
              }
            : comment
        )
      );
      addCommentRequest(comment);
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="app">
      <NavBar back="芳群园">MacBook Pro 2020</NavBar>
      <div className="body product-detail" style={{ padding: "16px" }}>
        <img src="http://localhost:8080/imgs/MacBookPro2020.jpeg" alt="" />
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
            <List.Item key={comment.id}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <strong>{comment.author}:</strong> {comment.content}
                </div>
                <Input
                  placeholder="回复这个评论"
                  value={
                    comment.id && replyingTo === comment.id ? replyContent : ""
                  }
                  onChange={(value) => setReplyContent(value)}
                  onFocus={() => setReplyingTo(comment.id ?? "")}
                />
                <Button
                  color="primary"
                  size="small"
                  onClick={() => handleReply(comment.id ?? "")}
                  style={{ marginTop: "8px" }}
                >
                  Reply
                </Button>
                {comment.replies && comment.replies.length > 0 && (
                  <List style={{ marginTop: "8px", paddingLeft: "16px" }}>
                    {comment.replies.map((reply) => (
                      <List.Item key={reply.id}>
                        <strong>{reply.author}:</strong> {reply.content}
                      </List.Item>
                    ))}
                  </List>
                )}
              </Space>
            </List.Item>
          ))}
        </List>
      </div>
      <div className="detail-footer">
        <div className="footer-left">
          <HeartOutline fontSize="24px" />
        </div>
        <div className="footer-right">
          <Button color="default">发私信</Button>
          <Button color="primary">我想要</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
