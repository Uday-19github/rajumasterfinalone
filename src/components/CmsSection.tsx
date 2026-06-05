import { Skeleton } from "@/components/ui/skeleton";
import { useSection } from "@/hooks/useContent";

type Props = {
  sectionKey: string;
  fallbackTitle?: string;
  fallbackBody?: string;
  fallbackImage?: string;
  children: (data: {
    title: string;
    body: string;
    image: string;
    meta: Record<string, any>;
  }) => React.ReactNode;
};

/**
 * CMS-driven section wrapper.
 * - Loads content row by section_key from the live useContent hook
 * - Hides itself if is_visible is false
 * - Shows skeleton while loading
 * - Falls back to provided defaults if no row exists
 */
export const CmsSection = ({
  sectionKey,
  fallbackTitle = "",
  fallbackBody = "",
  fallbackImage = "",
  children,
}: Props) => {
  const { section, loading, visible } = useSection(sectionKey);

  if (loading) {
    return (
      <div className="container py-12 space-y-4">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (!visible) return null;

  return (
    <>
      {children({
        title: section?.title || fallbackTitle,
        body: section?.body || fallbackBody,
        image: fallbackImage, // Enforce local assets instead of section?.image_url
        meta: section?.meta || {},
      })}
    </>
  );
};
