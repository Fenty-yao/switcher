import { NextResponse } from "next/server";

const messages = [
  {
    id: 1,
    avatar: "/imgs/avatar/赵四.jpeg",
    name: "赵四",
    lastMessage: "能便宜点吗!",
    time: "10:30 AM",
  },
  {
    id: 2,
    avatar: "/imgs/avatar/王五.jpeg",
    name: "王五",
    lastMessage: "下午4点约?",
    time: "9:15 AM",
  },
  {
    id: 3,
    avatar: "/imgs/avatar/老六.jpeg",
    name: "老六",
    lastMessage: "太贵不要了.",
    time: "昨天",
  },
];

export async function GET() {
  return NextResponse.json({ code: 200, data: messages });
}
