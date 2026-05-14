import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ code: 400, message: "请填写所有字段" }, { status: 400 });
  }

  const users = (global as any).__users || [];
  const user = users.find((u: any) => u.username === username);

  if (!user) {
    return NextResponse.json({ code: 404, message: "用户不存在" }, { status: 404 });
  }

  user.password = password;

  return NextResponse.json({ code: 200 });
}
