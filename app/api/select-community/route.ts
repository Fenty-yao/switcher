import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, userId } = await request.json();

  if (!name) {
    return NextResponse.json({ code: 400 }, { status: 400 });
  }

  // In production: store community selection in database
  // For now, update the in-memory user store
  const users = (global as any).__users || [];
  const user = users.find((u: any) => u.username === userId);
  if (user) {
    user.communitySelected = true;
  }

  return NextResponse.json({ code: 200 });
}
