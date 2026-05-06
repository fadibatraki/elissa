// This endpoint has been disabled for security reasons
// Admin user creation should be done through a secure CLI command or migration
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint has been disabled for security reasons" },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has been disabled for security reasons" },
    { status: 403 }
  );
}
