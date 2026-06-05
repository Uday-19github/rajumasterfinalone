import { PricingSection } from "@/components/PricingSection";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { useContent } from "@/hooks/useContent";
import { Link } from "react-router-dom";
import { ArrowRight, Music2, Zap, Sparkles, Globe, Flame, Heart } from "lucide-react";
const STYLE_ICONS = [Music2, Zap, Sparkles, Globe, Flame, Heart];

const subs = [
  {
    key: "dance_bollywood",
    name: "Bollywood",
    tag: "Most Popular",
    desc: "High-energy cinematic choreography that blends the grace of classical Indian dance with the punch of modern Bollywood beats. From iconic film sequences to original stage performances — for all ages and levels.",
    highlights: ["Beginner to Advanced", "Film-sequence Choreography", "Performance Opportunities", "All Ages Welcome"],
    accent: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/30",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    key: "dance_hiphop",
    name: "Hip-Hop",
    tag: "Street Style",
    desc: "Master the authentic foundations of urban street dance — popping, locking, waving, krump and freestyle. High-energy and fun, building physical fitness alongside raw, expressive movement skills.",
    highlights: ["Popping & Locking", "Freestyle Fundamentals", "Battle Preparation", "Crew Sessions"],
    accent: "from-purple-500/20 to-blue-500/10",
    border: "border-purple-500/30",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    key: "dance_freestyle",
    name: "Freestyle",
    tag: "Express Yourself",
    desc: "The purest form of self-expression — moving spontaneously to any genre of music. Learn how to truly listen to music, understand rhythmic patterns, and translate them into effortless movement.",
    highlights: ["Musicality Training", "Improvisation Techniques", "Confidence Building", "All Styles Welcome"],
    accent: "from-cyan-500/20 to-teal-500/10",
    border: "border-cyan-500/30",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    key: "dance_folk",
    name: "Folk",
    tag: "Cultural Heritage",
    desc: "Celebrate India's rich cultural diversity through Bhangra, Garba, Giddha, Lavani, and more. Connect to your roots while getting a fantastic full-body workout, perfect for festive performances.",
    highlights: ["Bhangra & Garba", "Lavani & Giddha", "Festive Training", "Cultural Storytelling"],
    accent: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/30",
    tagColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    key: "dance_breakdance",
    name: "Breakdance",
    tag: "Power & Precision",
    desc: "B-Boying/B-Girling combines athletic power, balance, and musical interpretation — now an Olympic sport! Covering toprock, downrock, freezes, and power moves with safe, progressive skill-building.",
    highlights: ["Toprock & Downrock", "Freezes & Power Moves", "Olympic-style Training", "Battle Preparation"],
    accent: "from-red-500/20 to-pink-500/10",
    border: "border-red-500/30",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    key: "dance_salsa",
    name: "Salsa",
    tag: "Latin Rhythm",
    desc: "Passion, rhythm, and partnership in motion. Covering fundamental footwork, timing, and lead-follow techniques for solo and partner styles. Great for social events, weddings, and competitions.",
    highlights: ["Solo & Partner Styles", "Cuban & LA Salsa", "Timing & Musicality", "Social Dance Events"],
    accent: "from-rose-500/20 to-fuchsia-500/10",
    border: "border-rose-500/30",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
];

const DancePage = () => {
  const { content, loading, sec } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-card">
        <div className="absolute inset-0 opacity-30">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/WhatsApp Video 2026-06-04 at 2.05.41 PM.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container relative z-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Rajumaster's Rise &amp; Shine
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.9] mb-6">
            DANCE <span className="text-gradient-fire">STUDIO.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Six powerful dance styles taught under one roof by India's most experienced choreographers. 20+ years. 100K+ students. Counting.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {["Bollywood", "Hip-Hop", "Freestyle", "Folk", "Breakdance", "Salsa"].map(s => (
              <span key={s} className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-wider">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-border">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "20+", l: "Years of Teaching" },
            { n: "100K+", l: "Students Trained" },
            { n: "6", l: "Dance Styles" },
            { n: "5", l: "Expert Trainers" },
          ].map(s => (
            <div key={s.l} className="text-center p-6 bg-card border border-border">
              <div className="font-display text-5xl text-primary mb-2">{s.n}</div>
              <div className="uppercase text-xs font-bold tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STYLES — Premium Cards */}
      <section className="container py-20">
        <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">What We Teach</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-16">Six <span className="text-primary">Styles.</span></h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {subs.map((sub, idx) => {
            const Icon = STYLE_ICONS[idx];
            const dynamicRow = sec(sub.key);
            const name = dynamicRow?.title || sub.name;
            const desc = dynamicRow?.body || sub.desc;
            const visible = dynamicRow?.is_visible ?? true;

            if (!visible) return null;

            return (
              <div
                key={sub.key}
                className={`relative group p-8 bg-card border ${sub.border} rounded-none overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Gradient bg accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${sub.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Large index number */}
                <div className="absolute top-4 right-6 font-display text-8xl text-foreground/5 leading-none select-none group-hover:text-foreground/10 transition-colors duration-500">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div className="relative z-10">
                  {/* Icon + Tag */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-widest ${sub.tagColor}`}>
                      {sub.tag}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-4xl md:text-5xl mb-4 leading-none text-foreground group-hover:text-primary transition-colors duration-300">
                    {name}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-primary mb-5 group-hover:w-full transition-all duration-500" />

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {desc}
                  </p>

                  {/* Highlights as chips */}
                  <div className="flex flex-wrap gap-2">
                    {sub.highlights.map(h => (
                      <span
                        key={h}
                        className="px-3 py-1 bg-background border border-border text-xs font-semibold text-foreground/70 uppercase tracking-wide group-hover:border-primary/30 transition-colors"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING */}
      <PricingSection type="dance" />

      {/* DANCE GALLERY */}
      <VideoGallerySection sectionKey="dance_gallery" subtitle="Vibe check" />

      {/* CTA */}
      <section className="bg-gradient-fire py-20">
        <div className="container text-center text-primary-foreground">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-6">READY TO MOVE?</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">Book your free trial class today and discover which dance style ignites your passion.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground font-bold uppercase tracking-wider hover:bg-card transition-all">
            Book Free Class <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default DancePage;
