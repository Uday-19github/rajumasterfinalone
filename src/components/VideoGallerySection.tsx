import { useContent } from "@/hooks/useContent";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import fallback1 from "@/assets/dance_bollywood.png";
import fallback2 from "@/assets/hiphop.jpg";
import fallback3 from "@/assets/zumba.jpg";
import fallback4 from "@/assets/sangeet.jpg";
import fallback5 from "@/assets/dance_breakdance.png";
import fallback6 from "@/assets/hero-dancer.jpg";

interface VideoGallerySectionProps {
  sectionKey: string;
  subtitle?: string;
}

function isYouTube(url: string) {
  return /(?:youtu\.be|youtube\.com)/i.test(url);
}

function getYouTubeEmbedSrc(url: string) {
  // Supports:
  // - https://youtube.com/shorts/<id>
  // - https://youtube.com/watch?v=<id>
  // - https://youtu.be/<id>
  // - https://youtube.com/embed/<id>
  // If we can parse the video id, always generate an embed URL.
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&/]+)/i);
  const id = match?.[1];
  if (!id) {
    console.warn(`Failed to extract YouTube ID from: ${url}`);
    return url;
  }

  // Hide all branding, controls, and user info
  const embedUrl = `https://www.youtube.com/embed/${id}?playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=0&disablekb=1&fs=0&cc_load_policy=0&autohide=1`;
  console.log(`Generated embed URL: ${embedUrl} from ${url}`);
  return embedUrl;
}




function isVideo(url: string) {

  return /\.(mp4|webm|mov|avi|mkv)$/i.test(url) ||
    (url.includes("supabase") && url.includes("video")) ||
    isYouTube(url);
}

/** Fix legacy CMS paths that pointed at /dist or /src (404 in production). */
function normalizeMediaUrl(url: string): string {
  const u = url.trim();
  if (u.startsWith("/dist/images/")) return u.replace("/dist/images/", "/images/");
  if (u.startsWith("/dist/videos/")) {
    const file = u.slice("/dist/videos/".length);
    if (file === "475521.mp4") return "/images/images-fitness/475521.mp4";
    if (file === "475523 (1).mp4") return "/images/trainers/475523.mp4";
    if (file === "475529 (3).mp4") return "/images/475529.mp4";
    return `/images/${file}`;
  }
  return u;
}

function isValidMediaUrl(url: string): boolean {
  const u = normalizeMediaUrl(url);
  if (!u) return false;
  if (u.startsWith("/src/")) return false;
  return (
    u.startsWith("http") ||
    u.startsWith("/") ||
    u.startsWith("data:image")
  );
}

function mergeGalleryMedia(base: string[], extra: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of [...base, ...extra]) {
    const u = normalizeMediaUrl(raw);
    if (!isValidMediaUrl(u)) continue;
    const key = u.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(u);
  }
  return out;
}

function normalizeAssetSrc(src: string): string {
  if (src.startsWith("/videos/") || src.startsWith("/images/")) {
    return encodeURI(src.replace(/\s+/g, " "));
  }
  return src;
}

export const VideoGallerySection = ({ sectionKey, subtitle = "Gallery" }: VideoGallerySectionProps) => {
  const { sec, loading } = useContent();
  const [showAll, setShowAll] = useState(false);
  const [brokenUrls, setBrokenUrls] = useState<Set<string>>(() => new Set());

  if (loading) return null;

  const row = sec(sectionKey);
  // If CMS hides this section explicitly, respect that
  if (row && row.is_visible === false) return null;

  const meta = (row?.meta ?? {}) as Record<string, unknown>;

  const cmsMediaRaw: string[] = Array.isArray(meta?.media)
    ? (meta.media as unknown[]).filter((url): url is string => typeof url === "string")
    : [];

  // Base media lists - hardcoded defaults
  let baseMediaList: string[] = [fallback1, fallback2, fallback3, fallback4, fallback5, fallback6];

  if (sectionKey === "fitness_gallery") {
    baseMediaList = [
      "/images/images-fitness/475521.mp4",
      "/images/images-fitness/image.png",
      "/images/images-fitness/image copy 5.png",
      "/images/images-fitness/image copy 2.png",
      "/images/images-fitness/image copy 3.png",
      "/images/images-fitness/image copy 4.png",
      "/images/images-fitness/image copy.png",
    ];
  } else if (sectionKey === "dance_gallery") {
    baseMediaList = [
      "/images/WhatsApp Video 2026-05-17 at 3.20.32 PM.mp4",
      "/images/475529.mp4",
      "/images/trainers/475523.mp4",
      "/images/28 video (online-video-cutter.com) (1) (1).mp4",
      "/images/475522.mp4",
      "/images/27 final.mp4",
      "/images/image.png",
      "/images/image copy 2.png",
      "/images/image copy 3.png",
      "/images/image copy 4.png",
      "/images/image copy 5.png",
      "/images/image copy 6.png",
      "/images/image copy 7.png",
      "/images/image copy 8.png",
      "/images/image copy 9.png",
      "/images/image copy 10.png",
    ];
  }

  // Hardcoded items first, then admin-added links from CMS (deduped, bad paths fixed)
  const mediaList =
    sectionKey === "dance_gallery" || sectionKey === "fitness_gallery" || cmsMediaRaw.length > 0
      ? mergeGalleryMedia(baseMediaList, cmsMediaRaw)
      : baseMediaList;

  const markBroken = (url: string) => {
    setBrokenUrls((prev) => {
      if (prev.has(url)) return prev;
      const next = new Set(prev);
      next.add(url);
      return next;
    });
  };

  const visibleMedia = mediaList.filter((url) => !brokenUrls.has(url));

  // Always render; if no media at all just skip
  if (visibleMedia.length === 0) return null;

  // Videos recorded sideways that need rotation correction
  const rotatedVideos: string[] = meta?.rotated_videos ?? ["475521.mp4"];

  const INITIAL_COUNT = 3;
  const displayedMedia = showAll ? visibleMedia : visibleMedia.slice(0, INITIAL_COUNT);

  return (
    <section className="container py-20 border-t border-border">
      <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">{subtitle}</p>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <h2 className="font-display text-5xl md:text-7xl">{row?.title || "Gallery."}</h2>
        {visibleMedia.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold uppercase tracking-widest text-xs"
          >
            {showAll ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Show All ({visibleMedia.length}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500">
        {displayedMedia.map((src: string, i: number) => {
          const video = isVideo(src);
          const youtube = isYouTube(src);
          const normalizedSrc = normalizeAssetSrc(src);
          const needsRotationNormalized = video && !youtube && rotatedVideos.some((r: string) => normalizedSrc.includes(r));

          return (
            <div
              key={`${src}-${i}`}
              className={`relative bg-muted overflow-hidden group animate-in fade-in zoom-in duration-500 ${
                video ? (src.includes("475521.mp4") ? "aspect-[16/9]" : "aspect-[9/16]") : "aspect-[4/3]"
              }`}
            >
              {video ? (
                <>
                  {youtube ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={getYouTubeEmbedSrc(src)}
                        title={`YouTube video ${i + 1}`}
                        className="w-full h-full"
                        style={{ border: "none", display: "block" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen={false}
                      />
                      {/* Subtle overlays to hide YouTube branding while maintaining consistency */}
                      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-b from-gray-900/30 to-transparent pointer-events-none z-10" />
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none z-10" />
                    </div>
                  ) : (
                    <video
                      src={normalizedSrc}
                      className={
                        needsRotationNormalized
                          ? src.includes("475521.mp4")
                            ? "absolute top-1/2 left-1/2 w-[56.25%] h-[177.78%] -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] object-cover"
                            : `w-full h-full object-cover rotate-[-90deg] scale-[1.78]`
                          : "w-full h-full object-cover"
                      }
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      // Show the first frame immediately instead of a black screen.
                      // (Browser will still auto-play only if muted; we keep it muted until hover.)
                      onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                        const el = e.currentTarget;
                        try {
                          // Attempt to seek to the first frame.
                          el.currentTime = 0;
                        } catch {
                          // ignore
                        }
                      }}
                      // Start preview playing silently so it renders the frame.
                      onCanPlay={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                        const el = e.currentTarget;
                        el.muted = true;
                        el.play().catch(() => {
                          // ignore autoplay restrictions; frame should still render.
                        });
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        if (!el) return;

                        el.muted = false;
                        el.play().catch(() => {
                          // Element might be unmounted by the time the promise rejects.
                          if (!el.isConnected) return;
                          el.muted = true;
                          el.play().catch(() => undefined);
                        });
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        if (!el) return;
                        if (!el.isConnected) return;

                        el.pause();
                        el.muted = true;
                      }}
                      onError={() => markBroken(src)}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={normalizedSrc}
                    alt={`Gallery ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={() => markBroken(src)}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
