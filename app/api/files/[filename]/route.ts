import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

function getUploadDir() {
  return process.env.UPLOAD_DIR || "/app/uploads/product-images";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    const fullPath = path.join(getUploadDir(), filename);
    const fileStats = await stat(fullPath);

    if (!fileStats.isFile()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const fileContent = await readFile(fullPath);
    const ext = path.extname(filename).toLowerCase();
    const contentType = ext === ".pdf" ? "application/pdf" : "application/octet-stream";

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStats.size.toString(),
        "Cache-Control": "public, max-age=604800, must-revalidate",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
