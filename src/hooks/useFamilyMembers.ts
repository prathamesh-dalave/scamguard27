import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  role: string;
  protection_mode: string;
  language: string;
  voice_alerts: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useFamilyMembers() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["family_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("family_members")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as FamilyMember[];
    },
    enabled: !!user,
  });
}

export function useAddFamilyMember() {
  const qc = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (member: { name: string; phone?: string; role: string; protection_mode: string; language: string; voice_alerts: boolean }) => {
      const { data, error } = await supabase
        .from("family_members")
        .insert({ ...member, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["family_members"] }),
  });
}
