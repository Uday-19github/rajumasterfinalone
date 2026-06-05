import { VideoGallerySection } from "@/components/VideoGallerySection";
import { useContent } from "@/hooks/useContent";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Mic2, Building2, Zap, Globe } from "lucide-react";
import genFlashmob from "@/assets/events_flashmob.png";

const STYLE_ICONS = [Star, Users, Building2, Zap, Globe, Mic2];

const subs = [
  {
    key: "events_professional",
    name: "Professional Group",
    tag: "Elite Performances",
    desc: "Our professional dance troupe is available for high-profile stage shows, movie promotional events, product launches, TV appearances, and cultural festivals. Full production support including costumes, sound coordination, and stage management.",
    highlights: ["500+ Stage Shows", "Movie & TV Appearances", "Full Production Support", "Custom Packages"],
    accent: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/30",
    tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  },
  {
    key: "events_sangeet",
    name: "Sangeet",
    tag: "Wedding Specialists",
    desc: "Make your sangeet night the most talked-about event of the season. We choreograph complete performances for the bride, groom, bridesmaids, groomsmen, parents — even the relatives who insist they can't dance. 3–8 session packages.",
    highlights: ["3 to 8 Session Packages", "Bride, Groom & Family", "Song Selection Guidance", "Same-day Rehearsal Support"],
    accent: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/30",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  },
  {
    key: "events_corporate",
    name: "Corporate Events",
    tag: "Professional Impact",
    desc: "Elevate your next corporate event with a professionally choreographed dance performance. Annual days, product launches, team-building workshops, award ceremonies — tailor-made performances that engage and energise your audience.",
    highlights: ["Annual Day Performances", "Team-building Workshops", "Award Ceremony Entertainment", "Brand Integration"],
    accent: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-500/30",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  {
    key: "events_flashmob",
    name: "Flash Mobs",
    tag: "Surprise & Delight",
    desc: "A perfectly executed flash mob creates a viral moment your audience will never forget. Marriage proposals, birthday surprises, brand activations, college events — we've delivered in malls, parks, offices, and airports.",
    highlights: ["Location Scouting & Permits", "Full Choreography Design", "Rehearsals with Your Team", "Social Media Ready"],
    accent: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/30",
    tagColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  {
    key: "events_all",
    name: "All Events",
    tag: "We've Got You Covered",
    desc: "No event is too big or too small. School annual days, college fests, birthday parties, anniversary celebrations, temple festivals, charity galas — we bring professional-quality dance entertainment to every occasion.",
    highlights: ["School & College Events", "Birthday & Anniversary Shows", "Festival & Cultural Programs", "Flexible Budgets"],
    accent: "from-purple-500/20 to-fuchsia-500/10",
    border: "border-purple-500/30",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  },
];

const EventsPage = () => {
  const { content, loading } = useContent();

  if (loading) return null;

  const sec = (key: string) => content.find(c => c.section_key === key);

  return (
    <>
      {/* HERO */}
      <section className="relative py-28 overflow-hidden bg-card">
        <div className="absolute inset-0 opacity-20">
          <img src={genFlashmob} alt="Events" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>
        <div className="container relative z-10">
          <span className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-[0.3em] font-bold mb-6">
            Rajumaster's Rise &amp; Shine
          </span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.9] mb-6">
            EVENTS &amp; <span className="text-gradient-fire">STAGES.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            From intimate sangeet nights to massive corporate galas — we choreograph moments that audiences remember forever. 500+ productions. Zero boring events.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {["Professional Group", "Sangeet", "Corporate", "Flash Mobs", "All Events"].map(s => (
              <span key={s} className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-wider">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-border">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "500+", l: "Stage Shows" },
            { n: "5+", l: "Movies Choreographed" },
            { n: "20+", l: "Years Experience" },
            { n: "5", l: "Expert Choreographers" },
          ].map(s => (
            <div key={s.l} className="text-center p-6 bg-card border border-border">
              <div className="font-display text-5xl text-primary mb-2">{s.n}</div>
              <div className="uppercase text-xs font-bold tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EVENT TYPES — Premium Cards */}
      <section className="container py-20">
        <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">What We Do</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-16">Five <span className="text-primary">Event Types.</span></h2>

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

      {/* PROCESS */}
      <section className="py-20 bg-card">
        <div className="container">
          <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3 text-center">How It Works</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl mb-16 text-center">Our Event <span className="text-primary">Process</span></h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Consultation", desc: "We discuss your event vision, audience size, venue, and budget in detail." },
              { step: "02", title: "Concept Design", desc: "Our creative team designs a custom choreography concept tailored to your event." },
              { step: "03", title: "Rehearsals", desc: "Structured rehearsal sessions at our studio or your preferred location." },
              { step: "04", title: "Deliver & Wow", desc: "Our team shows up prepared, professional, and ready to give a flawless performance." },
            ].map(p => (
              <div key={p.step} className="p-6 border border-border hover:border-primary/40 transition-colors">
                <div className="font-display text-5xl text-primary/20 mb-4">{p.step}</div>
                <h3 className="font-display text-2xl mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="bg-gradient-fire py-20">
        <div className="container text-center text-primary-foreground">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-6">LET'S CREATE MAGIC.</h2>
          <p className="text-xl opacity-90 max-w-xl mx-auto mb-8">Tell us about your event and our team will get back to you with a custom proposal within 24 hours.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground font-bold uppercase tracking-wider hover:bg-card transition-all">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default EventsPage;
