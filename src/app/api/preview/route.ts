import { NextResponse } from "next/server";

// Static-friendly placeholder. Real preview redirects require a Node runtime and
// can't be used with output: 'export'.
export function GET() {
  return new NextResponse(null, { status: 204 });
}
