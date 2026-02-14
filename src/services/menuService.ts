import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type MenuDuJour = Database["public"]["Tables"]["menu_du_jour"]["Row"];

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string | null;
  status: "draft" | "published";
  display_order: number;
  allergens: string[] | null;
  is_halal?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItemInsert {
  restaurant_id: string;
  category_id: string;
  title: string;
  description?: string | null;
  price?: number | null;
  image_url?: string | null;
  status?: "draft" | "published";
  display_order?: number;
  allergens?: string[] | null;
  is_halal?: boolean;
}

export interface MenuItemUpdate {
  title?: string;
  description?: string | null;
  price?: number | null;
  image_url?: string | null;
  status?: "draft" | "published";
  display_order?: number;
  allergens?: string[] | null;
  is_halal?: boolean;
}

export const menuService = {
  // Get all categories
  async getAllCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    return data || [];
  },

  // Get all menu items
  async getAllMenuItems() {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }

    return data || [];
  },

  // Get all categories with their menu items
  async getCategoriesWithItems(status: "published" | "draft" | "all" = "published") {
    const query = supabase
      .from("categories")
      .select(`
        *,
        menu_items(*)
      `)
      .order("display_order", { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    // Filter menu items by status
    const filteredData = data?.map(category => {
      // Safe cast menu items with status check
      const menuItems = (category.menu_items || []).map((item: any) => ({
        ...item,
        status: item.status as "published" | "draft",
        allergens: item.allergens || null,
        description: item.description || null,
        image_url: item.image_url || null,
        price: item.price || null
      })) as MenuItem[];

      return {
        ...category,
        menu_items: menuItems
          .filter(item => status === "all" ? true : item.status === status)
          .sort((a, b) => a.display_order - b.display_order)
      };
    });

    return filteredData || [];
  },

  // Get menu du jour
  async getMenuDuJour() {
    const { data, error } = await supabase
      .from("menu_du_jour")
      .select("*")
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching menu du jour:", error);
      throw error;
    }

    return data;
  },

  // Get single menu item
  async getMenuItem(id: string) {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching menu item:", error);
      throw error;
    }

    return data;
  },

  // Create menu item
  async createMenuItem(item: Omit<MenuItem, "id" | "created_at" | "updated_at">) {
    // Get restaurant ID first
    const { data: restaurant, error: restaurantError } = await supabase
      .from("restaurants")
      .select("id")
      .limit(1)
      .single();

    if (restaurantError || !restaurant) {
      console.error("Error fetching restaurant:", restaurantError);
      throw new Error("Restaurant not found");
    }

    const { data, error } = await supabase
      .from("menu_items")
      .insert({ ...item, restaurant_id: restaurant.id })
      .select()
      .single();

    if (error) {
      console.error("Error creating menu item:", error);
      throw error;
    }

    return data;
  },

  // Update menu item
  async updateMenuItem(id: string, updates: Partial<MenuItem>) {
    const { data, error } = await supabase
      .from("menu_items")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating menu item:", error);
      throw error;
    }

    return data;
  },

  // Delete menu item
  async deleteMenuItem(id: string) {
    const { error } = await supabase
      .from("menu_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting menu item:", error);
      throw error;
    }
  },

  // Create category
  async createCategory(category: Omit<Category, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("categories")
      .insert(category)
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      throw error;
    }

    return data;
  },

  // Update category
  async updateCategory(id: string, updates: Partial<Category>) {
    const { data, error } = await supabase
      .from("categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating category:", error);
      throw error;
    }

    return data;
  },

  // Delete category
  async deleteCategory(id: string) {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  // Update menu du jour
  async updateMenuDuJour(updates: Partial<MenuDuJour> & { title: string }) {
    const { data: existing } = await supabase
      .from("menu_du_jour")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from("menu_du_jour")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .limit(1)
        .single();

      const { data, error } = await supabase
        .from("menu_du_jour")
        .insert({ 
          restaurant_id: restaurant!.id,
          title: updates.title,
          description: updates.description || null,
          is_active: updates.is_active ?? true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  // Get all menu du jour items
  async getMenuDuJourItems(status: "published" | "draft" | "all" = "published") {
    let query = supabase
      .from("menu_du_jour_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching menu du jour items:", error);
      throw error;
    }

    return data || [];
  },

  // Create menu du jour item
  async createMenuDuJourItem(item: { title: string; description?: string; price?: number; status?: "draft" | "published"; display_order?: number }) {
    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("id")
      .limit(1)
      .single();

    if (!restaurant) throw new Error("Restaurant not found");

    const { data, error } = await supabase
      .from("menu_du_jour_items")
      .insert({ ...item, restaurant_id: restaurant.id })
      .select()
      .single();

    if (error) {
      console.error("Error creating menu du jour item:", error);
      throw error;
    }

    return data;
  },

  // Update menu du jour item
  async updateMenuDuJourItem(id: string, updates: { title?: string; description?: string; price?: number; status?: "draft" | "published"; display_order?: number }) {
    const { data, error } = await supabase
      .from("menu_du_jour_items")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating menu du jour item:", error);
      throw error;
    }

    return data;
  },

  // Delete menu du jour item
  async deleteMenuDuJourItem(id: string) {
    const { error } = await supabase
      .from("menu_du_jour_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting menu du jour item:", error);
      throw error;
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file: File, path: string) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("menu-images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  },

  // Log action
  async logAction(action: string, entityType: string, entityId?: string, details?: any) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .limit(1)
        .single();

      await supabase.from("audit_logs").insert({
        restaurant_id: restaurant!.id,
        user_id: user.id,
        action,
        entity_type: entityType,
        entity_id: entityId || null,
        details: details || null
      });
    }
  }
};