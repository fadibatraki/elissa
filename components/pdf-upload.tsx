// components/PdfUpload.tsx

import { useState, useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SinglePdfUploadProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
  disabled?: boolean;
  fileName?: string;
}

function resolvePdfUrl(value: string) {
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  return `/api/files/${value}`;
}

export function PdfUpload({
  onChange,
  onRemove,
  value,
  disabled,
  fileName,
}: SinglePdfUploadProps) {
  const [loading, setLoading] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(
    fileName || "Document",
  );

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Store the file name for display
      setCurrentFileName(file.name);
      setLoading(true);

      // Create a form data object
      const formData = new FormData();
      // Append the file to formData
      formData.append("files", file);

      try {
        // Upload file using our API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || "Upload failed");
        }

        const data = await response.json();
        const uploadedFile = data.files?.[0];

        if (!uploadedFile?.storedName) {
          throw new Error("Upload response is missing the stored PDF reference");
        }

        // Store the generated filename/reference. The file is served via /api/files/[filename].
        onChange(uploadedFile.storedName);
        // Clear the input value
        e.target.value = "";
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Error uploading file:", error);
        toast.error("Upload failed", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [onChange],
  );

  return (
    <div>
      {value ? (
        <div className="mb-4">
          <div className="relative p-4 border rounded-md bg-muted/10">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <div className="flex-1">
                <p className="font-medium truncate">{currentFileName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF Document
                </p>
              </div>
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-7 w-7 ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3">
              <a
                href={resolvePdfUrl(value)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View PDF
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted-foreground/20 rounded-lg mb-4">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">No PDF uploaded</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || loading}
            onClick={() => document.getElementById("pdf-upload")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload PDF
          </Button>
        </div>
      )}

      <div className="flex items-center">
        <Button
          type="button"
          disabled={disabled || loading}
          variant="secondary"
          onClick={() => document.getElementById("pdf-upload")?.click()}
          className={cn(
            "flex items-center",
            (disabled || loading) && "opacity-50 cursor-not-allowed",
          )}
        >
          <Upload className="h-4 w-4 mr-2" />
          {value ? "Change PDF" : "Upload PDF"}
        </Button>
        <p className="text-sm text-muted-foreground ml-4">
          Upload PDF document here
        </p>
      </div>

      <Input
        id="pdf-upload"
        type="file"
        accept="application/pdf"
        disabled={disabled || loading}
        onChange={onUpload}
        className="hidden"
      />
    </div>
  );
}
