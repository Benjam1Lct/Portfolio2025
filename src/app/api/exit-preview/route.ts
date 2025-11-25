import { NextResponse } from "next/server";

// Static-friendly placeholder for hosting on static providers.
// Preview/draft-mode routes require a Node runtime and can't be used with output: 'export'.
export function GET() {
  // Return 204 No Content so the static export can include this route harmlessly.
  return new NextResponse(null, { status: 204 });
}
