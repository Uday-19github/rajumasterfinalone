import { Link } from "react-router-dom";
import { ArrowRight, Music, Dumbbell, Sparkles, Star, Theater } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import heroDancer from "@/assets/hero-dancer.jpg";
import hiphop from "@/assets/hiphop.jpg";
import zumba from "@/assets/zumba.jpg";
import sangeet from "@/assets/sangeet.jpg";
import genBollywood from "@/assets/dance_bollywood.png";
import genBreakdance from "@/assets/dance_breakdance.png";
import genYoga from "@/assets/fitness_yoga.png";
import genSangeet from "@/assets/events_sangeet.png";
import genFlashmob from "@/assets/events_flashmob.png";
import genActing from "@/assets/acting_stage.png";
import { CmsSection } from "@/components/CmsSection";

const DEFAULT_STATS = [
  { n: "20+", l: "Years Experience" },
  { n: "100K+", l: "Students" },
  { n: "5+", l: "Movies Choreography" },
  { n: "5", l: "Trainers" },
  { n: "500+", l: "Stage Shows" },
];

const DEFAULT_PREVIEWS = [
  { icon: Music, title: "Dance", desc: "Bollywood · Hip-Hop · Freestyle · Folk · Breakdance · Salsa", img: genBollywood, key: "dance", to: "/services/dance" },
  { icon: Dumbbell, title: "Fitness", desc: "Zumba · Aerobics · Yoga · Weight Reduction · Body Toning", img: genYoga, key: "fitness", to: "/services/fitness" },
  { icon: Theater, title: "Acting", desc: "Drama · Monologues · Stage Presence · Coming Soon", img: genActing, key: "acting", to: "/services/acting" },
  { icon: Sparkles, title: "Events", desc: "Sangeet · Corporate · Flash Mobs · Professional Shows", img: genSangeet, key: "events", to: "/services/events" },
];

const DEFAULT_TESTIMONIALS = [
  "The classes run five days a week — gives me exactly the discipline I needed. — Priya S.",
  "Best dance and fitness studio in Bengaluru! Rajumaster knows exactly how to push you. — Rohan K.",
  "Different kinds of exercises mixed with music — best workout I've ever had! — Anjali M.",
  "Best Zumba class in Manikonda, hands down. My whole family joined now! — Meera T.",
  "Joined for fitness, stayed for the incredible family atmosphere. — Arjun D.",
  "World-class trainers, world-class energy. Changed my life in 3 months. — Kavya R.",
  "Rajumaster choreographed our entire sangeet. Everyone was blown away! — Deepika W.",
  "My daughter has been here for 2 years and the transformation is unbelievable. — Sunita B.",
  "5 movies worth of experience and it shows. The moves they teach are next level. — Vikram C.",
  "The 500+ shows legacy is real. You can feel the professionalism in every class. — Aisha F.",
  "Never thought I'd enjoy working out until I found Zumba here. — Lakshmi P.",
  "The flash mob Rajumaster organized for my proposal was absolutely perfect! — Rahul N.",
];

const Home = () => {
  const { content, loading } = useContent();
  const sec = (key: string) => content.find(c => c.section_key === key);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ── Stats ──
  const statsRow = sec("stats");
  const statsVisible = statsRow?.is_visible ?? true;
  const rawStats = (statsRow?.meta as any)?.statItems;
  const statsList = Array.isArray(rawStats) ? rawStats : DEFAULT_STATS.map(s => `${s.n}|${s.l}`);
  const statsData = statsList.map((s: string) => {
    const [n, l] = s.split("|");
    return { n, l };
  });

  // ── Previews ── 
  const previewsData = DEFAULT_PREVIEWS.map(p => {
    const row = sec(p.key);
    if (row && row.is_visible === false) return null;
    return {
      ...p,
      title: row?.title || p.title,
      desc: row?.body || p.desc,
      img: p.img, // Enforce local assets instead of row?.image_url
    };
  }).filter(Boolean);

  // ── Testimonials ──
  const testimonialsRow = sec("testimonials");
  const testimonialsVisible = testimonialsRow?.is_visible ?? true;
  const rawReviews = (testimonialsRow?.meta as any)?.quotes;
  const testimonialsData = Array.isArray(rawReviews) ? rawReviews : DEFAULT_TESTIMONIALS;

  return (
    <>
      <CmsSection
        sectionKey="hero"
        fallbackTitle="MOVE LIKE YOU MEAN IT."
        fallbackBody="20 years. 100,000 students. 500+ stages. Rajumaster's Rise & Shine is Bengaluru's premier destination for dance, fitness, acting, and events. Step in. Sweat hard. Shine bright."
        fallbackImage={heroDancer}
      >
        {({ title, body, image }) => (
          <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/images/trainers/founder.jpg" 
                alt="Rajumaster - Founder" 
                className="w-full h-full object-cover object-top opacity-50" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
            </div>

            <div className="container relative z-10 py-20 grid lg:grid-cols-2 gap-10 items-center">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
                  Raju master's
                </span>
                <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tight mb-6 text-gradient-fire">
                  {title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mb-8 whitespace-pre-wrap">
                  {body}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="group px-8 py-4 bg-gradient-fire text-primary-foreground font-bold uppercase tracking-wider flex items-center gap-2 hover:shadow-glow transition-all"
                  >
                    Book a Free Class
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </a>
                  <Link
                    to="/services"
                    className="px-8 py-4 border-2 border-secondary text-secondary font-bold uppercase tracking-wider hover:bg-secondary hover:text-secondary-foreground transition"
                  >
                    Explore Classes
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex flex-col gap-4 items-end animate-fade-in-right">
                {["Dance", "Fitness", "Acting", "Events"].map((s, idx) => (
                  <div key={s} className="group flex items-center gap-6" style={{ animationDelay: `${idx * 150}ms` }}>
                    <span className="font-display text-7xl md:text-9xl uppercase tracking-tighter text-white/10 group-hover:text-primary transition-all duration-700 cursor-default inline-block">
                      {s}
                    </span>
                    <div className="w-20 h-[4px] bg-primary scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </section>
        )}
      </CmsSection>

      {/* SERVICES PREVIEW */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
                <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">What We Do</p>
                <h2 className="font-display text-5xl md:text-7xl">Four Worlds. <span className="text-primary">One Stage.</span></h2>
                <p className="text-muted-foreground mt-3 max-w-xl">Dance · Fitness · Acting · Events — every discipline taught by masters with 20+ years of real stage experience.</p>
              </div>
            <Link to="/services" className="text-primary uppercase text-sm font-bold tracking-wider hover:underline">View All →</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewsData.map((p: any) => (
              <Link
                to={p.to || "/services"}
                key={p.title}
                className="group relative aspect-[4/5] overflow-hidden bg-card border border-border hover:border-primary transition-all"
              >
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <p.icon className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-display text-4xl mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                  <span className="inline-flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-wider">
                    Discover <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      {statsVisible && (
        <section className="bg-gradient-fire py-12">
          <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {statsData.map((s: any) => (
              <div key={s.l} className="text-center text-primary-foreground">
                <div className="font-display text-5xl md:text-7xl">{s.n}</div>
                <div className="uppercase text-xs md:text-sm font-bold tracking-widest mt-1 opacity-90">{s.l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIAL MARQUEE */}
      {testimonialsVisible && (
        <section className="py-24 overflow-hidden">
          <div className="container mb-10 text-center">
            <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Word on the Street</p>
            <h2 className="font-display text-5xl md:text-7xl">Loved by <span className="text-primary">Thousands.</span></h2>
          </div>
          <div className="relative">
            <div className="flex gap-6 marquee w-max">
              {[...testimonialsData, ...testimonialsData].map((t, i) => (
                <div key={i} className="w-[360px] shrink-0 bg-card border border-border p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-foreground/90 italic">"{t}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
