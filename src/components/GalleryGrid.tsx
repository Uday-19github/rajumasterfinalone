interface GalleryGridProps {
  images: { src: string; alt: string }[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {images.map((img, i) => (
      <div
        key={i}
        className="group relative aspect-square overflow-hidden bg-muted"
      >
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-90 transition" />
        <span className="absolute bottom-3 left-3 text-xs uppercase tracking-widest font-bold text-secondary opacity-0 group-hover:opacity-100 transition">
          {img.alt}
        </span>
      </div>
    ))}
  </div>
);

export default GalleryGrid;
