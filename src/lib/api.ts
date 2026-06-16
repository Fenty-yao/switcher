// API client — replaces module-specific *-api.ts files.
// All calls go to Next.js API routes (same origin, no hardcoded localhost).

import type { Comment } from "./types";

interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

async function apiCall<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(err.message || `请求失败 (${res.status})`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data as T;
}

export interface UserInfo {
  username: string;
  communitySelected: boolean;
}

export async function login(username: string, password: string): Promise<UserInfo> {
  return apiCall<UserInfo>("login", { username, password });
}

export async function register(username: string, password: string): Promise<UserInfo> {
  return apiCall<UserInfo>("register", { username, password });
}

export async function selectCommunity(name: string, userId: string): Promise<boolean> {
  try {
    await apiCall("select-community", { name, userId });
    return true;
  } catch {
    return false;
  }
}

export async function resetPassword(username: string, password: string): Promise<void> {
  return apiCall("reset-password", { username, password });
}

export async function addComment(comment: Comment): Promise<Comment> {
  return apiCall<Comment>("comments", comment);
}

export async function getComments(productId: string): Promise<Comment[]> {
  const res = await fetch(`/api/comments?productId=${encodeURIComponent(productId)}`);
  const json: ApiResponse<Comment[]> = await res.json();
  return json.data || [];
}

export interface ProductItem {
  title: string;
  description: string;
  createdAt: string;
  author: string;
  price: string;
  image: string;
}

export async function getProducts(page = 1, pageSize = 6): Promise<{ data: ProductItem[]; hasMore: boolean }> {
  const res = await fetch(`/api/products?page=${page}&pageSize=${pageSize}`);
  const json = await res.json();
  return { data: json.data || [], hasMore: json.hasMore ?? false };
}

export interface MessageItem {
  id: number;
  avatar: string;
  name: string;
  lastMessage: string;
  time: string;
}

export async function getMessages(): Promise<MessageItem[]> {
  const res = await fetch("/api/messages");
  const json: ApiResponse<MessageItem[]> = await res.json();
  return json.data || [];
}
