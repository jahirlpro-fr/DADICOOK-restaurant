import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type GalleryItem = Tables<"gallery_items">;
type GalleryItemInsert = TablesInsert<"gallery_items">;
type GalleryItemUpdate = TablesUpdate<"gallery_items">;

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
    
    return data || [];
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

    return data;
  },

  // Create gallery item
  async createGalleryItem(item: GalleryItemInsert): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from("gallery_items")
      .insert(item)
      .select()
      .single();

    if (error) {
      console.error("Error creating gallery item:", error);
      throw error;
    }

    return data;
  },

  // Update gallery item
  async updateGalleryItem(id: string, updates: GalleryItemUpdate): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from("gallery_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }

    return data;
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

  // Upload image to Supabase Storage
  async uploadImage(file: File, folder: string = "gallery"): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/image_${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    return data.publicUrl;
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

    await supabase.from("admin_logs").insert({
      user_id: user.id,
      action,
      entity_type,
      entity_id,
      details
    });
  }
};