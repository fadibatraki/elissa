// app/product-images/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

const MIME_TYPES: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
};

function getUploadDir() {
    // Must match the UPLOAD_DIR used in /api/upload
    // Default: /app/uploads/product-images
    const uploadDir = process.env.UPLOAD_DIR || "/app/uploads/product-images";
    return uploadDir;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;

        // Security: Prevent directory traversal
        if (filename.includes("..") || filename.includes("/")) {
            console.error(`[ProductImages] Invalid filename: ${filename}`);
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }

        const uploadDir = getUploadDir();
        const fullPath = path.join(uploadDir, filename);

        // Verify file exists
        const fileStats = await stat(fullPath);
        if (!fileStats.isFile()) {
            console.error(`[ProductImages] Not a file: ${fullPath}`);
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // Read file content
        const fileContent = await readFile(fullPath);

        // Determine MIME type from extension
        const ext = path.extname(filename).toLowerCase().slice(1);
        const contentType = MIME_TYPES[ext] || "application/octet-stream";

        console.log(`[ProductImages] Serving ${filename} (${fileStats.size} bytes, ${contentType})`);

        // Return with proper headers
        const response = new NextResponse(fileContent, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Length": fileStats.size.toString(),
                // Cache images for 7 days, but allow revalidation
                "Cache-Control": "public, max-age=604800, must-revalidate",
                // Allow CORS if needed
                "Access-Control-Allow-Origin": "*",
            },
        });

        return response;
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`[ProductImages] Error serving file:`, errorMsg);
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}
