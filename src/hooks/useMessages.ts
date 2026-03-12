import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Message {
  id: string;
  user_id: string;
  family_member_id: string | null;
  sender: string;
  type: string;
  message: string;
  risk_level: string | null;
  action_taken: string | null;
  status: string;
  detected_at: string;
}

export function useMessages(status?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["messages", status],
    queryFn: async () => {
      let query = supabase.from("messages").select("*, family_members(name)").order("detected_at", { ascending: false });
      if (status) query = query.eq("status", status);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}

export function useUpdateMessageStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("messages").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages"] }),
  });
}
