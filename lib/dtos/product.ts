export type ProductListImageDTO = {
  url: string;
  alt: string | null;
};

export type CategoryDTO = {
  id: string;
  name: string;
  name_zh: string | null;
  slug: string;
};

export type ProductListItemDTO = {
  id: string;
  name: string;
  name_zh: string | null;
  description: string | null;
  featured: boolean;
  slider: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: CategoryDTO;
  images: ProductListImageDTO[]; // ✅ خفيف (url فقط)
};