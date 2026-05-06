// components/ImageUpload.tsx
import { useState, useCallback } from "react";
import { Upload, X, FileImage } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
  disabled?: boolean;
}

export function ImageUpload({
  onChange,
  onRemove,
  value,
  disabled,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      // Log file count when clicking upload
      console.log(`[ImageUpload] Selected ${files.length} file(s) for upload`);

      setLoading(true);

      // Create a form data object
      const formData = new FormData();

      // Append each file to formData with field name "files"
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        // Upload files using our API endpoint
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        // Log API status
        console.log(`[ImageUpload] API response status: ${response.status}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[ImageUpload] Upload failed: ${errorText}`);
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(`[ImageUpload] API response JSON:`, data);

        // Fix: API returns { files: [...] } not { urls: [...] }
        const uploadedUrls = data.files?.map((f: any) => f.url) || [];

        if (uploadedUrls.length === 0) {
          throw new Error("No URLs returned from upload");
        }

        console.log(`[ImageUpload] Extracted ${uploadedUrls.length} URL(s):`, uploadedUrls);

        // Add the new image URLs to the existing ones
        onChange([...value, ...uploadedUrls]);

        // Clear the input value
        e.target.value = "";
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[ImageUpload] Upload error:`, errorMessage);

        // Show error toast to user
        toast.error("Upload failed", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [onChange, value],
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={url}
              alt="Product image"
              className="object-cover w-full h-full"
            />

          </div>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <Button
          type="button"
          disabled={disabled || loading}
          variant="secondary"
          onClick={() => document.getElementById("product-images")?.click()}
          className={cn(
            "flex items-center",
            (disabled || loading) && "opacity-50 cursor-not-allowed",
          )}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
        <p className="text-sm text-muted-foreground ml-4">
          Upload product images here
        </p>
      </div>
      <Input
        id="product-images"
        type="file"
        accept="image/*"
        multiple
        disabled={disabled || loading}
        onChange={onUpload}
        className="hidden"
      />
      {!value || value.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted-foreground/20 rounded-lg">
          <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            No images uploaded
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={disabled || loading}
            onClick={() => document.getElementById("product-images")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      ) : null}
    </div>
  );
}
