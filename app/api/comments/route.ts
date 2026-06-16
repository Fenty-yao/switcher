import { NextRequest, NextResponse } from "next/server";

// In-memory comments store
declare global {
  var __comments: { id: string; content: string; productId: string; author: string; createtime: string }[];
}
if (!(global as any).__comments) {
  (global as any).__comments = [];
}

export async function POST(request: NextRequest) {
  const comment = await request.json();

  if (!comment.content || !comment.productId) {
    return NextResponse.json({ code: 400 }, { status: 400 });
  }

  const comments = (global as any).__comments;
  const newComment = {
    ...comment,
    id: String(comments.length + 1),
    createtime: comment.createtime || new Date().toISOString(),
  };
  comments.push(newComment);

  return NextResponse.json({ code: 200, data: newComment });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  const comments = (global as any).__comments || [];
  const filtered = productId
    ? comments.filter((c: any) => c.productId === productId)
    : comments;

  return NextResponse.json({ code: 200, data: filtered });
}
