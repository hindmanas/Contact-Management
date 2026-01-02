import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ContactFormData } from "@/lib/validations";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  created_at: string;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setContacts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addContact = async (contactData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error: insertError } = await supabase.from("contacts").insert([
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          message: contactData.message || null,
        },
      ]);

      if (insertError) throw insertError;

      await fetchContacts();
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to add contact";
      return { success: false, error: errorMessage };
    }
  };

  const deleteContact = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error: deleteError } = await supabase.from("contacts").delete().eq("id", id);

      if (deleteError) throw deleteError;

      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete contact";
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return {
    contacts,
    isLoading,
    error,
    addContact,
    deleteContact,
    refetch: fetchContacts,
  };
}