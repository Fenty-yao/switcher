import { NextRequest, NextResponse } from "next/server";

// In-memory user store (replace with database in production)
const users: { username: string; password: string; communitySelected: boolean }[] = [
    { username: "test", password: "test", communitySelected: false },
];

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ code: 400 }, { status: 400 });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ code: 401 }, { status: 401 });
  }

  return NextResponse.json({
    code: 200,
    data: {
      username: user.username,
      communitySelected: user.communitySelected,
    },
  });
}
