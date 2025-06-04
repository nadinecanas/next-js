// app/api/comment/route.ts
import { NextResponse, NextRequest } from 'next/server';

interface Comment {
  id: number;
  postId: string;
  userId: string;
  body: string;
  createdAt: Date;
}

// In-memory "database"
let comments: Comment[] = [];
let nextCommentId = 1;

// GET: Return all comments
export async function GET() {
  return NextResponse.json(comments);
}

// POST: Add a new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, postId, body: commentBody } = body;

    if (!userId || !postId || !commentBody) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newComment: Comment = {
      id: nextCommentId++,
      userId,
      postId,
      body: commentBody,
      createdAt: new Date(),
    };

    comments.push(newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
