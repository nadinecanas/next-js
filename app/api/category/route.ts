// app/api/category/route.ts
import { NextResponse, NextRequest } from 'next/server';

interface Category {
  id: number;
  name: string;
  description: string;
}

// In-memory "database"
let categories: Category[] = [];
let nextCategoryId = 1;

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newCategory: Category = { id: nextCategoryId++, name, description };
    categories.push(newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
