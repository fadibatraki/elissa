// components/ProductForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category } from "@/lib/types";
import { createProduct, updateProduct } from "@/lib/products";
import { toast } from "sonner";
import { ImageUpload } from "@/components/image-upload";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

type SpecRow = { col1: string; col2: string };

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  name_zh: z.string().optional(),
  description: z.string().nullable(),

  // ✅ table rows
  specs_zh: z
    .array(
      z.object({
        col1: z.string().min(1, "Required"),
        col2: z.string().min(1, "Required"),
      }),
    )
    .default([]),

  featured: z.boolean(),
  slider: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

function normalizeSpecs(value: unknown): SpecRow[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((r) => ({
      col1: typeof (r as any)?.col1 === "string" ? (r as any).col1 : "",
      col2: typeof (r as any)?.col2 === "string" ? (r as any).col2 : "",
    }))
    .filter((r) => r.col1 !== "" || r.col2 !== "");
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const images = product?.images?.map((im) => im.url) || [];

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: product
      ? {
        name: product.name,
        name_zh: product.name_zh ?? "",
        description: product.description ?? "",
        specs_zh: normalizeSpecs((product as any).specs_zh),
        featured: product.featured,
        slider: product.slider,
        categoryId: product.categoryId,
        images: [...new Set(images)],
      }
      : {
        name: "",
        name_zh: "",
        description: "",
        specs_zh: [],
        featured: false,
        slider: false,
        categoryId: "",
        images: [],
      },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specs_zh",
  });

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    console.log("SUBMIT DATA:", data);
    console.log("SPECS:", data.specs_zh);
    try {
      if (product) {
        await updateProduct(product.id, data);
        toast.success("Success", { description: "Product updated successfully." });
      } else {
        await createProduct(data);
        toast.success("Success", { description: "Product created successfully." });
      }

      router.replace("/admin/products");
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error("Error", { description: "Failed to save product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{product ? "Edit Product" : "New Product"}</CardTitle>
            <CardDescription>
              {product ? "Update your product information." : "Add a new product to your store."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name_zh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name in Chinese</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value ?? ""}
                      rows={5}
                      placeholder="Product description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Chinese Specs Table */}
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Specific Info Of Product (Table)</FormLabel>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ col1: "", col2: "" })}
                  disabled={isSubmitting}
                >
                  + Add row
                </Button>
              </div>

              <div className="mt-3 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left font-medium w-1/2">Column 1</th>
                      <th className="p-3 text-left font-medium w-1/2">Column 2</th>
                      <th className="p-3 w-[90px]"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {fields.length === 0 ? (
                      <tr>
                        <td className="p-3 text-muted-foreground" colSpan={3}>
                          No rows yet. Click “Add row”.
                        </td>
                      </tr>
                    ) : (
                      fields.map((row, index) => (
                        <tr key={row.id} className="border-t">
                          <td className="p-3 align-top">
                            <FormField
                              control={form.control}
                              name={`specs_zh.${index}.col1` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="e.g. Material" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>

                          <td className="p-3 align-top">
                            <FormField
                              control={form.control}
                              name={`specs_zh.${index}.col2` as const}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="e.g. Aluminum" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </td>

                          <td className="p-3 align-top">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => remove(index)}
                              disabled={isSubmitting}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <FormDescription className="mt-2">
                Add dynamic rows with two columns (Chinese table data).
              </FormDescription>
            </FormItem>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Product</FormLabel>
                    <FormDescription>
                      Featured products are displayed prominently on the homepage.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slider"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Slider Product</FormLabel>
                    <FormDescription>
                      Products to be displayed on the hero slider in homepage.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      disabled={isSubmitting}
                      onChange={(urls) => field.onChange(urls)}
                      onRemove={(url) =>
                        field.onChange(field.value.filter((current) => current !== url))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (product ? "Updating..." : "Creating...") : product ? "Update Product" : "Create Product"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
