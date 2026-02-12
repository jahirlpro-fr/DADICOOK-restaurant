import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { menuService } from "@/services/menuService";
import { LogOut, Plus, Edit, Trash2, Eye, EyeOff, Upload, Save } from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  allergens: string[] | null;
  status: "draft" | "published";
  display_order: number;
}

interface MenuDuJour {
  title: string;
  description: string | null;
  is_active: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuDuJour, setMenuDuJour] = useState<MenuDuJour | null>(null);
  
  // Form states
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isMenuDuJourDialogOpen, setIsMenuDuJourDialogOpen] = useState(false);
  
  // Upload state
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
      return;
    }
    setUser(session.user);
    setLoading(false);
  };

  const loadData = async () => {
    try {
      const [categoriesData, menuDuJourData] = await Promise.all([
        menuService.getCategoriesWithItems("all"),
        menuService.getMenuDuJour()
      ]);
      
      setCategories(categoriesData as any);
      
      // Flatten menu items from all categories
      const allItems: MenuItem[] = [];
      categoriesData.forEach((cat: any) => {
        if (cat.menu_items) {
          allItems.push(...cat.menu_items);
        }
      });
      setMenuItems(allItems);
      
      setMenuDuJour(menuDuJourData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleSaveMenuItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const itemData = {
      category_id: formData.get("category_id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      price: parseFloat(formData.get("price") as string),
      allergens: (formData.get("allergens") as string)?.split(",").map(a => a.trim()).filter(Boolean) || null,
      status: formData.get("status") as "draft" | "published",
      display_order: parseInt(formData.get("display_order") as string) || 0,
      image_url: editingItem?.image_url || null
    };

    try {
      if (editingItem) {
        await menuService.updateMenuItem(editingItem.id, itemData as any);
        await menuService.logAction("update", "menu_item", editingItem.id, itemData);
      } else {
        await menuService.createMenuItem(itemData as any);
        await menuService.logAction("create", "menu_item", undefined, itemData);
      }
      
      setIsDialogOpen(false);
      setEditingItem(null);
      loadData();
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) return;
    
    try {
      await menuService.deleteMenuItem(id);
      await menuService.logAction("delete", "menu_item", id);
      loadData();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const handleSaveCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const categoryData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string || null,
      display_order: parseInt(formData.get("display_order") as string) || 0
    };

    try {
      if (editingCategory) {
        await menuService.updateCategory(editingCategory.id, categoryData);
        await menuService.logAction("update", "category", editingCategory.id, categoryData);
      } else {
        await menuService.createCategory(categoryData as any);
        await menuService.logAction("create", "category", undefined, categoryData);
      }
      
      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      loadData();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les plats associés seront également supprimés.")) return;
    
    try {
      await menuService.deleteCategory(id);
      await menuService.logAction("delete", "category", id);
      loadData();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const handleSaveMenuDuJour = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const menuData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      is_active: formData.get("is_active") === "true"
    };

    try {
      await menuService.updateMenuDuJour(menuData);
      await menuService.logAction("update", "menu_du_jour", undefined, menuData);
      setIsMenuDuJourDialogOpen(false);
      loadData();
    } catch (error) {
      console.error("Error saving menu du jour:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      const imageUrl = await menuService.uploadImage(file, "menu-items");
      if (editingItem) {
        setEditingItem({ ...editingItem, image_url: imageUrl });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <>
      <SEO title="Admin - DADICOOK" />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-primary text-secondary border-b border-secondary/20">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-serif">Administration DADICOOK</h1>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </header>

        <div className="container py-8">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="categories">Catégories</TabsTrigger>
              <TabsTrigger value="menu-du-jour">Menu du Jour</TabsTrigger>
            </TabsList>

            {/* Menu Items Tab */}
            <TabsContent value="menu" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif">Gestion du Menu</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingItem(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau plat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingItem ? "Modifier le plat" : "Nouveau plat"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveMenuItem} className="space-y-4">
                      <div>
                        <Label htmlFor="category_id">Catégorie</Label>
                        <Select name="category_id" defaultValue={editingItem?.category_id} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="title">Nom du plat</Label>
                        <Input
                          id="title"
                          name="title"
                          defaultValue={editingItem?.title}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={editingItem?.description || ""}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="price">Prix (€)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={editingItem?.price}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="allergens">Allergènes (séparés par des virgules)</Label>
                        <Input
                          id="allergens"
                          name="allergens"
                          defaultValue={editingItem?.allergens?.join(", ") || ""}
                          placeholder="Ex: Gluten, Lactose, Fruits à coque"
                        />
                      </div>

                      <div>
                        <Label htmlFor="status">Statut</Label>
                        <Select name="status" defaultValue={editingItem?.status || "draft"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="display_order">Ordre d'affichage</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="number"
                          defaultValue={editingItem?.display_order || 0}
                        />
                      </div>

                      <div>
                        <Label htmlFor="image">Image</Label>
                        <div className="space-y-2">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                          />
                          {editingItem?.image_url && (
                            <div className="relative w-full h-48">
                              <Image
                                src={editingItem.image_url}
                                alt="Preview"
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" disabled={uploading}>
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {categories.map((category) => {
                  const categoryItems = menuItems.filter(item => item.category_id === category.id);
                  
                  return (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {categoryItems.length === 0 ? (
                            <p className="text-muted-foreground text-sm">Aucun plat dans cette catégorie</p>
                          ) : (
                            categoryItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 border rounded hover:bg-accent/5">
                                <div className="flex items-center gap-4 flex-1">
                                  {item.image_url && (
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                      <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        className="object-cover rounded"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{item.title}</h4>
                                      {item.status === "draft" && (
                                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                          Brouillon
                                        </span>
                                      )}
                                      {item.status === "published" && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                          Publié
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€</p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setEditingItem(item);
                                      setIsDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteMenuItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif">Gestion des Catégories</h2>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingCategory(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouvelle catégorie
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveCategory} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nom</Label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={editingCategory?.name}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={editingCategory?.description || ""}
                          rows={2}
                        />
                      </div>

                      <div>
                        <Label htmlFor="display_order">Ordre d'affichage</Label>
                        <Input
                          id="display_order"
                          name="display_order"
                          type="number"
                          defaultValue={editingCategory?.display_order || 0}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {categories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="flex items-center justify-between p-6">
                      <div>
                        <h3 className="font-serif text-lg">{category.name}</h3>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">Ordre: {category.display_order}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingCategory(category);
                            setIsCategoryDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Menu du Jour Tab */}
            <TabsContent value="menu-du-jour" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif">Menu du Jour</h2>
                <Dialog open={isMenuDuJourDialogOpen} onOpenChange={setIsMenuDuJourDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier le Menu du Jour</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveMenuDuJour} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Titre</Label>
                        <Input
                          id="title"
                          name="title"
                          defaultValue={menuDuJour?.title || ""}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          defaultValue={menuDuJour?.description || ""}
                          rows={5}
                          placeholder="Décrivez le menu du jour..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="is_active">Statut</Label>
                        <Select name="is_active" defaultValue={menuDuJour?.is_active ? "true" : "false"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Actif</SelectItem>
                            <SelectItem value="false">Inactif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsMenuDuJourDialogOpen(false)}>
                          Annuler
                        </Button>
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Enregistrer
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-6">
                  {menuDuJour ? (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="font-serif text-xl">{menuDuJour.title}</h3>
                        {menuDuJour.is_active ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Visible
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            Masqué
                          </span>
                        )}
                      </div>
                      {menuDuJour.description && (
                        <p className="text-muted-foreground whitespace-pre-line">{menuDuJour.description}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aucun menu du jour configuré</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}