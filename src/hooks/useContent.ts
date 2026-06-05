import { useEffect, useRef, useState } from "react";
import { supabase, PULSE_SEED } from "@/lib/supabase";



export type ContentRow = {
  id: string;
  section_key: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  is_visible: boolean;
  sort_order: number;
  meta?: Record<string, unknown>;
};


export type SeedRow = {
  section_key: string;
  section_label: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  is_visible: boolean;
  sort_order: number;
  meta: Record<string, unknown>;
};


export type ContentRowAny = ContentRow & {
  button_text?: string | null;
  button_link?: string | null;
};



export function useContent() {
  const [content, setContent] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);

  const isMountedRef = useRef(true);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);


  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*")
          .order("sort_order", { ascending: true });
        
        if (!mounted) return;
        
        if (error) {
          console.error("Supabase fetch error:", error);
        } else if (data) {
          console.log("Supabase fetch success:", data.length, "rows");
          setContent(data as ContentRow[]);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();

    const channel = supabase
      .channel(`content-changes-${Math.random().toString(36).slice(2, 9)}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "content" },
        (payload) => {
          // Guard against late async events during teardown.
          if (!mounted || !isMountedRef.current) return;

          setContent((prev) => {
            if (payload.eventType === "INSERT") {
              const row = payload.new as ContentRow;
              return [...prev.filter((r) => r.id !== row.id), row].sort(
                (a, b) => a.sort_order - b.sort_order
              );
            }
            if (payload.eventType === "UPDATE") {
              const row = payload.new as ContentRow;
              return prev
                .map((r) => (r.id === row.id ? row : r))
                .sort((a, b) => a.sort_order - b.sort_order);
            }
            if (payload.eventType === "DELETE") {
              const row = payload.old as ContentRow;
              return prev.filter((r) => r.id !== row.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    channelRef.current = channel;


    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const sec = (key: string) => {
    const found = content.find((c) => c.section_key === key);
    if (found) return found;

    const seed = PULSE_SEED.find((s) => s.section_key === key);
    if (!seed) return undefined;

    // Convert SeedRow -> ContentRow shape expected by components.
    return {
      id: seed.section_key,
      section_key: seed.section_key,
      title: seed.title,
      body: seed.body,
      image_url: seed.image_url,
      is_visible: seed.is_visible,
      sort_order: seed.sort_order,
      meta: seed.meta,
    } satisfies ContentRow;
  };



  return { content, loading, sec };
}

export function useSection(key: string) {
  const { content, loading } = useContent();
  const section = content.find((c) => c.section_key === key);
  const visible = section ? (section.is_visible ?? true) : true;
  return { section, loading, visible };
}

