import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  voice_alerts: boolean;
  default_protection_mode: string;
}

export function useUserSettings() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_settings").select("*").maybeSingle();
      if (error) throw error;
      return data as UserSettings | null;
    },
    enabled: !!user,
  });
}

export function useUpsertUserSettings() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (settings: { language: string; voice_alerts: boolean; default_protection_mode: string }) => {
      const { data, error } = await supabase
        .from("user_settings")
        .upsert({ ...settings, user_id: user!.id, updated_at: new Date().toISOString() }, { onConflict: "user_id" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user_settings"] }),
  });
}
