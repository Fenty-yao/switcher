import { NextRequest, NextResponse } from "next/server";

// Shared with login route — in production, use a database
declare global {
  var __users: { username: string; password: string; communitySelected: boolean }[];
}
// Initialize if not exists
if (!(global as any).__users) {
  (global as any).__users = [];
}

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ code: 400, message: "请填写所有字段" }, { status: 400 });
  }

  const users = (global as any).__users;
  const exists = users.find((u: any) => u.username === username);
  if (exists) {
    return NextResponse.json({ code: 409, message: "用户名已存在" }, { status: 409 });
  }

  users.push({ username, password, communitySelected: false });

  return NextResponse.json({
    code: 200,
    data: { username, communitySelected: false },
  });
}
