"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../supabase/client";
import { ArrowLeft, Plus, Search, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "@/components/admin/ProductList";
import ProductForm from "@/components/admin/ProductForm";

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

export default function AdminProductsPage() {
  const router = useRouter();
  const supabase = createClient();

  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "kg",
    category_id: "",
    available: true,
    is_featured: false,
  });

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is admin
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          router.push("/sign-in");
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (userError || userData?.role !== "admin") {
          router.push("/");
          return;
        }

        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (productsError) {
          console.error("Error fetching products:", productsError);
          showNotification("error", "Greška pri učitavanju proizvoda");
        } else {
          setProducts(productsData || []);
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("name");

        if (categoriesError) {
          console.error("Error fetching categories:", categoriesError);
        } else {
          setCategories(categoriesData || []);
        }
      } catch (error) {
        console.error("Error:", error);
        showNotification("error", "Došlo je do greške");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  // Show notification
  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  // Open form for adding a new product
  const openAddForm = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      unit: "kg",
      category_id: categories.length > 0 ? categories[0].id : "",
      available: true,
      is_featured: false,
    });
    setImageFile(null);
    setImagePreview("");
    setIsFormOpen(true);
  };

  // Open form for editing a product
  const openEditForm = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      unit: product.unit,
      category_id: product.category_id,
      available: product.available,
      is_featured: product.is_featured || false,
    });
    setImagePreview(product.image_url);
    setImageFile(null);
    setIsFormOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = selectedProduct?.image_url || "";

      // Upload image if a new one is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);
        imageUrl = data.publicUrl;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        unit: formData.unit,
        category_id: formData.category_id,
        available: formData.available,
        is_featured: formData.is_featured,
        image_url: imageUrl,
        updated_at: new Date().toISOString(),
      };

      if (selectedProduct) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", selectedProduct.id);

        if (error) throw error;
        showNotification("success", "Proizvod uspešno ažuriran");
      } else {
        // Add new product
        const { error } = await supabase
          .from("products")
          .insert([{ ...productData, created_at: new Date().toISOString() }]);

        if (error) throw error;
        showNotification("success", "Proizvod uspešno dodat");
      }

      // Refresh products list
      const { data: refreshedProducts } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      setProducts(refreshedProducts || []);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      showNotification("error", "Greška pri čuvanju proizvoda");
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      // First check if there are any cart_items referencing this product
      const { data: cartItems } = await supabase
        .from("cart_items")
        .select("id")
        .eq("product_id", selectedProduct.id);

      // If cart items exist, delete them first
      if (cartItems && cartItems.length > 0) {
        const { error: cartDeleteError } = await supabase
          .from("cart_items")
          .delete()
          .eq("product_id", selectedProduct.id);

        if (cartDeleteError) {
          throw cartDeleteError;
        }
      }

      // Delete product from database
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", selectedProduct.id);

      if (error) throw error;

      // If product has an image, delete it from storage
      if (selectedProduct.image_url) {
        const imagePath = selectedProduct.image_url.split("/").pop();
        if (imagePath) {
          await supabase.storage.from("product-images").remove([imagePath]);
        }
      }

      // Update products list
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
      showNotification("success", "Proizvod uspešno obrisan");
    } catch (error) {
      console.error("Error deleting product:", error);
      showNotification("error", "Greška pri brisanju proizvoda");
    } finally {
      setIsDeleteDialogOpen(false);
      setLoading(false);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Nepoznata kategorija";
  };

  return (
    <div className="min-h-screen bg-seoskaBeige pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center text-seoskaBrown hover:text-seoskaGreen transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span>Nazad na admin panel</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 mx-2" />
            <h1 className="text-2xl font-amatic font-bold text-seoskaBrown">
              Upravljanje proizvodima
            </h1>
          </div>
          <Button
            onClick={openAddForm}
            className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Dodaj novi proizvod
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Notification */}
        {notification && (
          <div className="mb-6">
            <Alert
              variant={
                notification.type === "error" ? "destructive" : "default"
              }
            >
              {notification.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Mobile View: Tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="list">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="list">Lista proizvoda</TabsTrigger>
              <TabsTrigger value="form" disabled={!isFormOpen}>
                {selectedProduct ? "Izmeni proizvod" : "Dodaj proizvod"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Pretraži proizvode..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <ProductList
                products={filteredProducts}
                getCategoryName={getCategoryName}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                loading={loading}
              />
            </TabsContent>
            <TabsContent value="form">
              {isFormOpen && (
                <ProductForm
                  formData={formData}
                  imagePreview={imagePreview}
                  categories={categories}
                  selectedProduct={selectedProduct}
                  onInputChange={handleInputChange}
                  onSwitchChange={handleSwitchChange}
                  onImageChange={handleImageChange}
                  onSubmit={handleSubmit}
                  onCancel={() => setIsFormOpen(false)}
                  loading={loading}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View: Two-column layout */}
        <div className="hidden md:flex gap-8">
          {/* Left column: Product list */}
          <div className="w-3/5">
            <div className="mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Pretraži proizvode..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ProductList
              products={filteredProducts}
              getCategoryName={getCategoryName}
              onEdit={openEditForm}
              onDelete={openDeleteDialog}
              loading={loading}
            />
          </div>

          {/* Right column: Product form */}
          <div className="w-2/5">
            {isFormOpen ? (
              <ProductForm
                formData={formData}
                imagePreview={imagePreview}
                categories={categories}
                selectedProduct={selectedProduct}
                onInputChange={handleInputChange}
                onSwitchChange={handleSwitchChange}
                onImageChange={handleImageChange}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormOpen(false)}
                loading={loading}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                <div className="text-gray-400 mb-4">
                  <Plus size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-seoskaBrown mb-2">
                  Dodaj novi proizvod
                </h3>
                <p className="text-gray-500 mb-6">
                  Kliknite na dugme ispod da dodate novi proizvod u ponudu
                </p>
                <Button
                  onClick={openAddForm}
                  className="bg-seoskaGreen hover:bg-seoskaGreen/90 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Dodaj proizvod
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Potvrda brisanja</AlertDialogTitle>
            <AlertDialogDescription>
              Da li ste sigurni da želite da obrišete proizvod &quot;
              {selectedProduct?.name}&quot;? Ova akcija je nepovratna.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Otkaži</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {loading ? "Brisanje..." : "Obriši"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
