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
import { galleryService } from "@/services/galleryService";
import { LogOut, Plus, Edit, Trash2, Eye, EyeOff, Upload, Save, Pencil } from "lucide-react";
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
  is_halal?: boolean;
}

interface GalleryItem {
  id: string;
  category_id?: string | null;
  title: string;
  description: string | null;
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

interface MenuDuJourItem {
  id: string;
  restaurant_id: string;
  title: string;
  description: string | null;
  price: number | null;
  status: "draft" | "published";
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [menuDuJour, setMenuDuJour] = useState<MenuDuJour | null>(null);
  const [menuDuJourItems, setMenuDuJourItems] = useState<MenuDuJourItem[]>([]);
  
  // Form states
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [editingMenuDuJourItem, setEditingMenuDuJourItem] = useState<MenuDuJourItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
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
      const [categoriesData, menuDuJourData, menuDuJourItemsData, galleryData] = await Promise.all([
        menuService.getCategoriesWithItems("all"),
        menuService.getMenuDuJour(),
        menuService.getMenuDuJourItems("all"),
        galleryService.getGalleryItems("all")
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
      setGalleryItems(galleryData as any);
      setMenuDuJour(menuDuJourData);
      setMenuDuJourItems(menuDuJourItemsData as any);
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
      image_url: editingItem?.image_url || null,
      is_halal: formData.get("is_halal") === "true"
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

  const handleSaveGalleryItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const categoryId = formData.get("category_id") as string;
    
    const itemData = {
      category_id: categoryId === "uncategorized" ? null : categoryId,
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      allergens: (formData.get("allergens") as string)?.split(",").map(a => a.trim()).filter(Boolean) || null,
      status: formData.get("status") as "draft" | "published",
      display_order: parseInt(formData.get("display_order") as string) || 0,
      image_url: editingGalleryItem?.image_url || null
    };

    try {
      if (editingGalleryItem && editingGalleryItem.id) {
        await galleryService.updateGalleryItem(editingGalleryItem.id, itemData as any);
        await galleryService.logAction("update", "gallery_item", editingGalleryItem.id, itemData);
      } else {
        await galleryService.createGalleryItem(itemData as any);
        await galleryService.logAction("create", "gallery_item", undefined, itemData);
      }
      
      setIsGalleryDialogOpen(false);
      setEditingGalleryItem(null);
      loadData();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;
    
    try {
      await galleryService.deleteGalleryItem(id);
      await galleryService.logAction("delete", "gallery_item", id);
      loadData();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
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

  const handleDeleteMenuDuJour = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer le menu du jour ?")) return;
    
    try {
      await menuService.updateMenuDuJour({ title: "", description: null, is_active: false });
      await menuService.logAction("delete", "menu_du_jour");
      loadData();
    } catch (error) {
      console.error("Error deleting menu du jour:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const handleSaveMenuDuJourItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const itemData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string || null,
      price: parseFloat(formData.get("price") as string) || null,
      status: formData.get("status") as "draft" | "published",
      display_order: parseInt(formData.get("display_order") as string) || 0
    };

    try {
      if (editingMenuDuJourItem) {
        await menuService.updateMenuDuJourItem(editingMenuDuJourItem.id, itemData);
        await menuService.logAction("update", "menu_du_jour_item", editingMenuDuJourItem.id, itemData);
      } else {
        await menuService.createMenuDuJourItem(itemData);
        await menuService.logAction("create", "menu_du_jour_item", undefined, itemData);
      }
      
      setIsMenuDuJourDialogOpen(false);
      setEditingMenuDuJourItem(null);
      loadData();
    } catch (error) {
      console.error("Error saving menu du jour item:", error);
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDeleteMenuDuJourItem = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce plat du jour ?")) return;
    
    try {
      await menuService.deleteMenuDuJourItem(id);
      await menuService.logAction("delete", "menu_du_jour_item", id);
      loadData();
    } catch (error) {
      console.error("Error deleting menu du jour item:", error);
      alert("Erreur lors de la suppression");
    }
  };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isGallery: boolean = false) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const service = isGallery ? galleryService : menuService;
            const imageUrl = await service.uploadImage(file, isGallery ? "gallery" : "menu-items");

            if (isGallery) {
                if (editingGalleryItem && editingGalleryItem.id) {
                    // Editing existing item
                    setEditingGalleryItem({ ...editingGalleryItem, image_url: imageUrl });
                } else {
                    // Creating new item - set initial state with image
                    setEditingGalleryItem({
                        id: "",
                        category_id: null,
                        title: "",
                        description: null,
                        image_url: imageUrl,
                        allergens: null,
                        status: "draft",
                        display_order: 0
                    } as GalleryItem);
                }
            } else if (editingItem) {
                setEditingItem({ ...editingItem, image_url: imageUrl });
            }

            // Force a re-render to show the image
            setTimeout(() => {
                const imgElement = document.querySelector('img[alt="Preview"]');
                if (imgElement && imageUrl) {
                    (imgElement as HTMLImageElement).src = imageUrl + '?t=' + Date.now();
                }
            }, 100);

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Erreur lors de l'upload de l'image");
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
              <TabsTrigger value="galerie">Galerie</TabsTrigger>
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
                        <Label htmlFor="is_halal">Viande Halal</Label>
                        <Select name="is_halal" defaultValue={editingItem?.is_halal ? "true" : "false"}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">Non spécifié</SelectItem>
                            <SelectItem value="true">Oui (Certifié Halal)</SelectItem>
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

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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
                {categories.map((category) => {
                  const categoryItems = menuItems.filter(item => item.category_id === category.id);
                  
                  return (
                    <Card key={category.id}>
                      <CardHeader>
                            <CardTitle className="text-xl text-primary">{category.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {categoryItems.length === 0 ? (
                            <p className="text-muted-foreground text-sm">Aucun plat dans cette catégorie</p>
                          ) : (
                            categoryItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 border rounded hover:bg-accent/5">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
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
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground/80 mt-1 italic">{item.description}</p>
                                  )}
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

            {/* Gallery Tab */}
            <TabsContent value="galerie" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif">Gestion de la Galerie</h2>
                <Button
                  onClick={() => {
                    setEditingGalleryItem(null);
                    setIsGalleryDialogOpen(true);
                  }}
                  className="bg-primary hover:bg-primary/90 text-background"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle image
                </Button>
              </div>

              <div className="space-y-8">
                {categories
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((category) => {
                        const categoryGalleryItems = galleryItems
                    .filter((item) => item.category_id === category.id)
                    .sort((a, b) => a.display_order - b.display_order);

                  return (
                    <Card key={category.id} className="p-6">
                          <h3 className="text-xl text-primary font-semibold mb-6">
                        {category.name} 
                      </h3>
                      <div className="space-y-4">
                        {categoryGalleryItems.length === 0 ? (
                          <p className="text-accent/60 text-sm italic">
                            Aucune image dans cette catégorie
                          </p>
                        ) : (
                          categoryGalleryItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start gap-4 p-4 border border-primary/10 hover:border-primary/30 transition-colors"
                            >
                              {/* Image Thumbnail */}
                              <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-surface">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-accent/40">
                                    Pas d'image
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="space-y-1">
                                    <h4 className="font-display text-lg text-primary">
                                      {item.title}
                                    </h4>
                                    {item.description && (
                                      <p className="text-sm text-muted-foreground/80 mt-1 italic">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setEditingGalleryItem(item);
                                        setIsGalleryDialogOpen(true);
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleDeleteGalleryItem(item.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Allergens */}
                                {item.allergens && item.allergens.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {item.allergens.map((allergen, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 bg-accent/5 text-accent/70 border border-accent/10"
                                      >
                                        {allergen}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                {/* Status Badge */}
                                <div>
                                  <span
                                    className={`inline-block text-xs px-2 py-1 ${
                                      item.status === "published"
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : "bg-amber-50 text-amber-700 border border-amber-200"
                                    }`}
                                  >
                                    {item.status === "published" ? "Publié" : "Brouillon"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </Card>
                  );
                })}

                {/* Uncategorized Items */}
                {galleryItems.filter((item) => !item.category_id).length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-2xl font-display text-primary mb-6">
                      Non catégorisé
                    </h3>
                    <div className="space-y-4">
                      {galleryItems
                        .filter((item) => !item.category_id)
                        .map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start gap-4 p-4 border border-primary/10 hover:border-primary/30 transition-colors"
                          >
                            <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-surface">
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-accent/40">
                                  Pas d'image
                                </div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <h4 className="font-display text-lg text-primary">
                                    {item.title}
                                  </h4>
                                  {item.description && (
                                    <p className="text-sm text-accent/70 italic">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setEditingGalleryItem(item);
                                      setIsGalleryDialogOpen(true);
                                    }}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteGalleryItem(item.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              {item.allergens && item.allergens.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {item.allergens.map((allergen, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs px-2 py-0.5 bg-accent/5 text-accent/70 border border-accent/10"
                                    >
                                      {allergen}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div>
                                <span
                                  className={`inline-block text-xs px-2 py-1 ${
                                    item.status === "published"
                                      ? "bg-green-50 text-green-700 border border-green-200"
                                      : "bg-amber-50 text-amber-700 border border-amber-200"
                                  }`}
                                >
                                  {item.status === "published" ? "Publié" : "Brouillon"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Gallery Item Edit Dialog */}
              <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingGalleryItem ? "Modifier l'image" : "Nouvelle image"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveGalleryItem} className="space-y-4">
                    <div>
                      <Label htmlFor="gallery_category_id">Catégorie</Label>
                      <Select name="category_id" defaultValue={editingGalleryItem?.category_id || "uncategorized"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uncategorized">Non catégorisé</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="gallery_title">Nom</Label>
                      <Input
                        id="gallery_title"
                        name="title"
                        defaultValue={editingGalleryItem?.title}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery_description">Description</Label>
                      <Textarea
                        id="gallery_description"
                        name="description"
                        defaultValue={editingGalleryItem?.description || ""}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery_image">Image</Label>
                      <div className="space-y-2">
                        {editingGalleryItem?.image_url && (
                          <div className="w-full h-48 overflow-hidden bg-surface">
                            <img
                              src={editingGalleryItem.image_url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <Input
                          id="gallery_image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          disabled={uploading}
                        />
                        {uploading && <p className="text-sm text-accent/60">Upload en cours...</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gallery_allergens">Allergènes (séparés par des virgules)</Label>
                      <Input
                        id="gallery_allergens"
                        name="allergens"
                        defaultValue={editingGalleryItem?.allergens?.join(", ") || ""}
                        placeholder="Ex: Gluten, Lactose, Fruits à coque"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery_status">Statut</Label>
                      <Select name="status" defaultValue={editingGalleryItem?.status || "draft"}>
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
                      <Label htmlFor="gallery_display_order">Ordre d'affichage</Label>
                      <Input
                        id="gallery_display_order"
                        name="display_order"
                        type="number"
                        defaultValue={editingGalleryItem?.display_order || 0}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsGalleryDialogOpen(false)}
                      >
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
            </TabsContent>

            {/* Menu du Jour Tab */}
            <TabsContent value="menu-du-jour" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif">Menu du Jour</h2>
                <Dialog open={isMenuDuJourDialogOpen} onOpenChange={setIsMenuDuJourDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingMenuDuJourItem(null)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau plat du jour
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingMenuDuJourItem ? "Modifier le plat du jour" : "Nouveau plat du jour"}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSaveMenuDuJourItem} className="space-y-4">
                      <div>
                        <Label htmlFor="mdj_title">Nom du plat</Label>
                        <Input
                          id="mdj_title"
                          name="title"
                          defaultValue={editingMenuDuJourItem?.title}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="mdj_description">Description</Label>
                        <Textarea
                          id="mdj_description"
                          name="description"
                          defaultValue={editingMenuDuJourItem?.description || ""}
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="mdj_price">Prix (€)</Label>
                        <Input
                          id="mdj_price"
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={editingMenuDuJourItem?.price || ""}
                        />
                      </div>

                      <div>
                        <Label htmlFor="mdj_status">Statut</Label>
                        <Select name="status" defaultValue={editingMenuDuJourItem?.status || "published"}>
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
                        <Label htmlFor="mdj_display_order">Ordre d'affichage</Label>
                        <Input
                          id="mdj_display_order"
                          name="display_order"
                          type="number"
                          defaultValue={editingMenuDuJourItem?.display_order || 0}
                        />
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
                  <div className="space-y-2">
                    {menuDuJourItems.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Aucun plat du jour</p>
                    ) : (
                      menuDuJourItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded hover:bg-accent/5">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
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
                            {item.price && (
                              <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€</p>
                            )}
                            {item.description && (
                              <p className="text-sm text-muted-foreground/80 mt-1 italic">{item.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingMenuDuJourItem(item);
                                setIsMenuDuJourDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteMenuDuJourItem(item.id)}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}