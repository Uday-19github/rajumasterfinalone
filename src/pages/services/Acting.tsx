import { Link } from "react-router-dom";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { ArrowRight, Clock, Star, Users, Mic2, Eye, Move, FileText, Video, Layers } from "lucide-react";
import genActingStage from "@/assets/acting_stage.png";

const COMING_MODULES = [
  {
    icon: Eye,
    title: "Basic Expressions & Emotions",
    tag: "Foundation",
    desc: "Master the art of conveying a full spectrum of human emotions — joy, grief, anger, love — with authenticity and control.",
    accent: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/30",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    icon: Mic2,
    title: "Dialogue Delivery",
    tag: "Voice & Diction",
    desc: "Learn proper diction, voice projection, pause and emphasis techniques that make dialogue delivery compelling and memorable.",
    accent: "from-purple-500/20 to-blue-500/10",
    border: "border-purple-500/30",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
  {
    icon: Move,
    title: "Stage Presence & Body Language",
    tag: "Physical Storytelling",
    desc: "Command any stage with confidence. Learn how posture, movement, and spatial awareness create powerful physical storytelling.",
    accent: "from-cyan-500/20 to-teal-500/10",
    border: "border-cyan-500/30",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  },
  {
    icon: FileText,
    title: "Monologues & Scene Work",
    tag: "Character Depth",
    desc: "Deep-dive into character analysis and rehearsed performance with guided monologue and scene-work sessions.",
    accent: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/30",
    tagColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    icon: Video,
    title: "Screen Acting Basics",
    tag: "Camera Technique",
    desc: "Understand the differences between stage and screen performance, including working with camera angles and close-up technique.",
    accent: "from-red-500/20 to-pink-500/10",
    border: "border-red-500/30",
    tagColor: "bg-red-500/10 text-red-400 border-red-500/30",
  },
  {
    icon: Layers,
    title: "Dance-Drama Integration",
    tag: "Unique to Rajumaster",
    desc: "Uniquely combining our dance expertise with acting — learn how physical movement and acting merge in musical theatre and film.",
    accent: "from-rose-500/20 to-fuchsia-500/10",
    border: "border-rose-500/30",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  },
];

const ActingPage = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-card">
        <div className="absolute inset-0 opacity-15">
          <img src={genActingStage} alt="Acting Studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container relative z-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Rajumaster's Rise &amp; Shine
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.9] mb-6">
            ACTING <span className="text-gradient-fire">STUDIO.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Building a world-class curriculum for performance arts, drama, and acting. Crafted by choreographers who have worked on 5+ major Bollywood productions.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3" /> Launching Soon
          </div>
        </div>
      </section>

      {/* COMING SOON BANNER */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-6 text-primary">COMING SOON</h2>
          <p className="text-xl text-muted-foreground mb-4">
            We are designing a world-class acting curriculum that draws on 20+ years of stage and film performance experience — from basic expressions to advanced dramatic performances.
          </p>
          <p className="text-muted-foreground mb-10">
            Register your interest now to get early access, priority enrollment, and an exclusive introductory discount when we launch.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-fire text-primary-foreground font-bold uppercase tracking-wider hover:shadow-glow transition-all">
            Register Interest <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-border">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Star, n: "5+", l: "Movies Choreographed", sub: "Film industry experience that informs every lesson" },
            { icon: Users, n: "100K+", l: "Students Mentored", sub: "Proven track record nurturing talent from grassroots to stage" },
            { icon: Clock, n: "20+", l: "Years on Stage", sub: "Real performance experience no textbook can replicate" },
          ].map(s => (
            <div key={s.l} className="text-center p-8 bg-card border border-border">
              <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="font-display text-5xl text-primary mb-1">{s.n}</div>
              <div className="font-bold uppercase text-xs tracking-widest mb-2">{s.l}</div>
              <p className="text-muted-foreground text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S COMING — Premium Cards */}
      <section className="container py-20">
        <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Curriculum Preview</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-16">What's <span className="text-primary">Coming.</span></h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {COMING_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className={`relative group p-8 bg-card border ${mod.border} overflow-hidden hover:shadow-glow transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Gradient bg accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

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
                    <span className={`px-3 py-1 border text-[10px] font-bold uppercase tracking-widest ${mod.tagColor}`}>
                      {mod.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {mod.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-[2px] bg-primary mb-5 group-hover:w-full transition-all duration-500" />

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


    </>
  );
};

export default ActingPage;
