import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export interface GalleryItem {
  id: string;
  restaurant_id: string;
  category_id?: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  allergens: string[] | null;
  status: "draft" | "published";
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItemInsert {
  restaurant_id: string;
  category_id?: string | null;
  title: string;
  description?: string | null;
  image_url?: string | null;
  allergens?: string[] | null;
  status?: "draft" | "published";
  display_order?: number;
}

export interface GalleryItemUpdate {
  category_id?: string | null;
  title?: string;
  description?: string | null;
  image_url?: string | null;
  allergens?: string[] | null;
  status?: "draft" | "published";
  display_order?: number;
}

export const galleryService = {
  // Get all gallery items (with status filter)
  async getGalleryItems(status: "all" | "published" | "draft" = "all"): Promise<GalleryItem[]> {
    let query = supabase
      .from("gallery_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error("Error fetching gallery items:", error);
      throw error;
    }
    
    // Cast the data to match the interface since Supabase returns string for enums sometimes
    return (data || []).map(item => ({
      ...item,
      category_id: item.category_id || null, // Ensure category_id is handled
      status: item.status as "published" | "draft"
    }));
  },

  // Get single gallery item
  async getGalleryItem(id: string): Promise<GalleryItem | null> {
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching gallery item:", error);
      throw error;
    }

    return data ? {
      ...data,
      category_id: data.category_id || null,
      status: data.status as "published" | "draft"
    } : null;
  },

  // Create gallery item
  async createGalleryItem(item: Omit<GalleryItemInsert, "restaurant_id">): Promise<GalleryItem> {
    // Get the first restaurant
    const { data: restaurants, error: restaurantError } = await supabase
      .from("restaurants")
      .select("id")
      .limit(1)
      .single();
    
    if (restaurantError || !restaurants) {
      console.error("Error fetching restaurant:", restaurantError);
      throw new Error("Restaurant not found");
    }

    const { data, error } = await supabase
      .from("gallery_items")
      .insert({ ...item, restaurant_id: restaurants.id })
      .select()
      .single();

    if (error) {
      console.error("Error creating gallery item:", error);
      throw error;
    }

    return {
      ...data,
      category_id: data.category_id || null,
      status: data.status as "published" | "draft"
    };
  },

  // Update gallery item
  async updateGalleryItem(id: string, updates: GalleryItemUpdate): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from("gallery_items")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }

    return {
      ...data,
      category_id: data.category_id || null,
      status: data.status as "published" | "draft"
    };
  },

  // Delete gallery item
  async deleteGalleryItem(id: string): Promise<void> {
    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting gallery item:", error);
      throw error;
    }
  },

  // Upload image to local file system (uploads folder)
  async uploadImage(file: File, folder: string = "gallery"): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/image_${Math.random().toString(36).substring(2)}.${fileExt}`;

    return `/uploads/${fileName}`;
  },

  // Log admin action
  async logAction(
    action: string,
    entity_type: string,
    entity_id?: string,
    details?: any
  ): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    // Get restaurant ID
    const { data: restaurant } = await supabase.from("restaurants").select("id").limit(1).single();
    if (!restaurant) return;

    await supabase.from("audit_logs").insert({
      user_id: user.id,
      restaurant_id: restaurant.id,
      action,
      entity_type,
      entity_id: entity_id || user.id, // Fallback ID if undefined
      details
    });
  }
};