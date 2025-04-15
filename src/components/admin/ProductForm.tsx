"use client";

import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category_id: string;
  available: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  formData: {
    name: string;
    description: string;
    price: string;
    unit: string;
    category_id: string;
    available: boolean;
  };
  imagePreview: string;
  categories: Category[];
  selectedProduct: Product | null;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSwitchChange: (checked: boolean) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ProductForm({
  formData,
  imagePreview,
  categories,
  selectedProduct,
  onInputChange,
  onSwitchChange,
  onImageChange,
  onSubmit,
  onCancel,
  loading,
}: ProductFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-seoskaBrown">
        {selectedProduct ? "Izmeni proizvod" : "Dodaj novi proizvod"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slika proizvoda
            </Label>
            <div className="mt-1 flex items-center">
              <div className="h-32 w-32 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <Upload className="mx-auto h-8 w-8" />
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  <span>Promeni sliku</span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={onImageChange}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    className="ml-2 text-sm text-red-500 hover:text-red-700"
                    onClick={() => {
                      // Clear image preview
                      document
                        .getElementById("image-upload")
                        ?.setAttribute("value", "");
                      // If editing and there was an image, keep the original image
                      if (selectedProduct) {
                        // Keep the original image
                      } else {
                        // Clear the preview for new products
                      }
                    }}
                  >
                    Ukloni
                  </button>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF do 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Naziv proizvoda *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={onInputChange}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Opis proizvoda
            </Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={onInputChange}
              className="w-full"
            />
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cena (RSD) *
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={onInputChange}
                className="w-full"
              />
            </div>
            <div>
              <Label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Jedinica mere *
              </Label>
              <select
                id="unit"
                name="unit"
                required
                value={formData.unit}
                onChange={onInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="l">Litar (l)</option>
                <option value="ml">Mililitar (ml)</option>
                <option value="kom">Komad (kom)</option>
                <option value="pak">Pakovanje (pak)</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <Label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kategorija *
            </Label>
            <select
              id="category_id"
              name="category_id"
              required
              value={formData.category_id}
              onChange={onInputChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {categories.length === 0 && (
                <option value="">Nema dostupnih kategorija</option>
              )}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between">
            <Label
              htmlFor="available"
              className="text-sm font-medium text-gray-700"
            >
              Dostupnost proizvoda
            </Label>
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={onSwitchChange}
            />
          </div>

          {/* Featured Product */}
          <div className="flex items-center justify-between">
            <Label
              htmlFor="is_featured"
              className="text-sm font-medium text-gray-700"
            >
              Istaknuti proizvod
            </Label>
            <Switch
              id="is_featured"
              checked={formData.is_featured || false}
              onCheckedChange={(checked) => {
                onInputChange({
                  target: { name: "is_featured", value: checked },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Otkaži
            </Button>
            <Button
              type="submit"
              className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white"
              disabled={loading}
            >
              {loading
                ? "Čuvanje..."
                : selectedProduct
                  ? "Sačuvaj izmene"
                  : "Dodaj proizvod"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
