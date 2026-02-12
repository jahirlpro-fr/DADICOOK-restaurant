import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
type MenuDuJour = Database["public"]["Tables"]["menu_du_jour"]["Row"];

export const menuService = {
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
    const filteredData = data?.map(category => ({
      ...category,
      menu_items: category.menu_items?.filter((item: MenuItem) => 
        status === "all" ? true : item.status === status
      ).sort((a: MenuItem, b: MenuItem) => a.display_order - b.display_order) || []
    }));

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
    const { data, error } = await supabase
      .from("menu_items")
      .insert(item)
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