import { PricingSection } from "@/components/PricingSection";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Heart, Leaf, Flame, Dumbbell, Music2 } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const STYLE_ICONS = [Zap, Heart, Leaf, Flame, Dumbbell, Music2];

const subs = [
  {
    key: "fitness_zumba",
    name: "Zumba",
    tag: "Most Fun",
    desc: "A global fitness phenomenon combining upbeat Latin and international music with energizing dance moves. Our certified instructors lead high-energy routines suitable for all fitness levels — burn 500–800 calories without even realising it.",
    highlights: ["Certified Instructors", "500–800 Calories/Session", "All Fitness Levels", "Morning & Evening Batches"],
    accent: "from-orange-500/20 to-yellow-500/10",
    border: "border-orange-500/30",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    key: "fitness_aerobics",
    name: "Aerobics",
    tag: "Cardio Powerhouse",
    desc: "A structured, high-energy cardio workout set to motivating music. Focus on cardiovascular endurance, lung capacity, coordination, and stamina. Measurable improvements in fitness levels within just a few weeks.",
    highlights: ["Progressive Curriculum", "Cardiovascular Health", "Structured for All Levels", "5 Days a Week"],
    accent: "from-red-500/20 to-pink-500/10",
    border: "border-red-500/30",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    key: "fitness_yoga",
    name: "Yoga",
    tag: "Mind & Body",
    desc: "Traditional Hatha and Vinyasa practices fused with modern flow techniques. Classes focus on flexibility, core strength, breath control, and mental clarity — for beginners seeking stress relief to advanced practitioners.",
    highlights: ["Hatha & Vinyasa Styles", "Flexibility & Core Strength", "Stress Relief", "Beginner to Advanced"],
    accent: "from-green-500/20 to-teal-500/10",
    border: "border-green-500/30",
    tagColor: "bg-green-500/10 text-green-400 border-green-500/30",
  },
  {
    key: "fitness_weightloss",
    name: "Weight Reduction",
    tag: "Results Driven",
    desc: "Scientifically structured to maximise calorie burn while keeping you engaged. HIIT principles with dance choreography target fat loss, improve metabolism, and build lean muscle. 8-week structured program with nutritional guidance.",
    highlights: ["HIIT-based Dance Routines", "8-Week Program", "Nutritional Guidance", "Visible Results in 4 Weeks"],
    accent: "from-purple-500/20 to-indigo-500/10",
    border: "border-purple-500/30",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    key: "fitness_toning",
    name: "Body Toning",
    tag: "Sculpt & Define",
    desc: "Sculpt, define, and strengthen specific muscle groups using resistance training, body-weight exercises, and dynamic movement. Progressive overload targets the arms, core, glutes, and legs for a lean, toned physique.",
    highlights: ["Resistance Training", "Targeted Muscle Sculpting", "Core, Glutes & Arms", "All Genders Welcome"],
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/30",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
];

const FitnessPage = () => {
  const { content, loading } = useContent();

  if (loading) return null;

  const sec = (key: string) => content.find(c => c.section_key === key);

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
            <source src="/images/rama rama~2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container relative z-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Rajumaster's Rise &amp; Shine
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.9] mb-6">
            FITNESS <span className="text-gradient-fire">CENTER.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Forget the boring gym grind. Our fitness programs blend dance, strength, mindfulness, and high-energy cardio for transformations that actually last.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {["Zumba", "Aerobics", "Yoga", "Weight Reduction", "Body Toning"].map(s => (
              <span key={s} className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-wider">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-border">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "100K+", l: "Students Trained" },
            { n: "5", l: "Fitness Programs" },
            { n: "500+", l: "Calories/Session" },
            { n: "8 Wk", l: "Transformation Plan" },
          ].map(s => (
            <div key={s.l} className="text-center p-6 bg-card border border-border">
              <div className="font-display text-5xl text-primary mb-2">{s.n}</div>
              <div className="uppercase text-xs font-bold tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS — Premium Cards */}
      <section className="container py-20">
        <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">What We Offer</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-16">Five <span className="text-primary">Programs.</span></h2>

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
                className={`relative group p-8 bg-card border ${sub.border} overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1`}
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
      <PricingSection type="fitness" />

      {/* FITNESS GALLERY */}
      <VideoGallerySection sectionKey="fitness_gallery" subtitle="In action" />

      {/* CTA */}
      <section className="bg-gradient-fire py-20">
        <div className="container text-center text-primary-foreground">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-6">START YOUR JOURNEY.</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">Book a free trial session today and let our expert trainers design the perfect fitness plan for you.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground font-bold uppercase tracking-wider hover:bg-card transition-all">
            Book Free Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default FitnessPage;
