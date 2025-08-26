import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor") ?? undefined;
    const pageSize = 10;

    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }], // stable order
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,                              
      take: pageSize + 1,                              
    });

    const hasMore = items.length > pageSize;
    const posts = hasMore ? items.slice(0, -1) : items;
    const nextCursor = hasMore ? posts[posts.length - 1].id : undefined;

    return NextResponse.json({ posts, nextCursor });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
