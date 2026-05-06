// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import path from "path";
import { mkdir, writeFile, stat } from "fs/promises";
import crypto from "crypto";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const FILE_CONFIG: Record<string, { ext: string; urlPrefix: string }> = {
  "image/png": { ext: "png", urlPrefix: "/product-images" },
  "image/jpeg": { ext: "jpg", urlPrefix: "/product-images" },
  "image/webp": { ext: "webp", urlPrefix: "/product-images" },
  "application/pdf": { ext: "pdf", urlPrefix: "/api/files" },
};

function extFromMime(mime: string) {
  return FILE_CONFIG[mime]?.ext ?? "bin";
}

function getUploadDir() {
  // Use UPLOAD_DIR env var (default: /app/uploads/product-images)
  // Mounted as a docker volume for persistence
  const uploadDir = process.env.UPLOAD_DIR || "/app/uploads/product-images";
  return uploadDir;
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  // واجهتك ترسل "files"
  const files = formData.getAll("files").filter(Boolean) as File[];
  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  await mkdir(uploadDir, { recursive: true });

  const uploaded: {
    url: string;
    name: string;
    storedName: string;
    size: number;
    type: string;
  }[] = [];

  for (const f of files) {
    const fileConfig = FILE_CONFIG[f.type];

    if (!fileConfig) {
      return NextResponse.json({ error: `Invalid file type: ${f.type}` }, { status: 400 });
    }
    if (f.size <= 0) {
      return NextResponse.json({ error: `Empty file: ${f.name}` }, { status: 400 });
    }
    if (f.size > MAX_SIZE) {
      return NextResponse.json({ error: `File too large: ${f.name}` }, { status: 400 });
    }

    const bytes = Buffer.from(await f.arrayBuffer());
    if (bytes.length <= 0) {
      return NextResponse.json({ error: `Empty buffer: ${f.name}` }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const ext = extFromMime(f.type);
    const filename = `${id}.${ext}`;
    const fullPath = path.join(uploadDir, filename);

    await writeFile(fullPath, bytes);

    // ✅ تأكيد أن الملف انكتب فعلاً وبحجم صحيح
    const s = await stat(fullPath);
    console.log("[UPLOAD] saved", { filename, mime: f.type, bytes: bytes.length, stat: s.size, fullPath });

    uploaded.push({
      url: `${fileConfig.urlPrefix}/${filename}`,
      name: f.name,
      storedName: filename,
      size: f.size,
      type: f.type,
    });
  }

  return NextResponse.json({
    files: uploaded,
    urls: uploaded.map((file) => file.url),
  });
}
