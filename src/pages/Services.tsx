import { Link } from "react-router-dom";
import { ArrowRight, Music2, Dumbbell, Theater, PartyPopper } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import danceImg from "@/assets/dance_bollywood.png";
import fitnessImg from "@/assets/fitness_toning.png";
import actingImg from "@/assets/acting_stage.png";
import eventsImg from "@/assets/events_sangeet.png";

const SERVICES = [
  {
    title: "DANCE",
    desc: "From Bollywood to Breakdance — master the art of movement with India's finest choreographers.",
    image: danceImg,
    path: "/services/dance",
    icon: Music2,
    color: "from-orange-500/20 to-red-500/20",
    accent: "text-orange-500",
  },
  {
    title: "FITNESS",
    desc: "Transform your body with high-energy Zumba, Yoga, and specialized weight loss programs.",
    image: fitnessImg,
    path: "/services/fitness",
    icon: Dumbbell,
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-500",
  },
  {
    title: "ACTING",
    desc: "Unlock your performance potential with professional drama, expression, and stage-craft training.",
    image: actingImg,
    path: "/services/acting",
    icon: Theater,
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-500",
  },
  {
    title: "EVENTS",
    desc: "Make your special moments legendary with our professional choreography and event management.",
    image: eventsImg,
    path: "/services/events",
    icon: PartyPopper,
    color: "from-yellow-500/20 to-amber-500/20",
    accent: "text-yellow-500",
  },
];

const Services = () => {
  const { content, loading } = useContent();
  const sec = (key: string) => content.find(c => c.section_key === key);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const heroRow = sec("services_hero");
  const heroTitle = heroRow?.title || "CHOOSE YOUR <br /> <span class=\"text-gradient-fire\">STAGE.</span>";
  const heroBody = heroRow?.body || "Four world-class disciplines under one roof. Whether you're chasing fitness, fame, or pure joy — we've got the floor for you.";

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="container pt-32 pb-20">
        <div className="max-w-4xl">
          <p className="text-primary uppercase text-sm tracking-[0.4em] font-bold mb-4">OUR DISCIPLINES</p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl leading-[0.8] mb-8" dangerouslySetInnerHTML={{ __html: heroTitle }} />
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {heroBody}
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="container pb-32">
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              to={service.path}
              className="group relative h-[350px] md:h-[450px] overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-700"
            >
              {/* Background Image */}
              <div className="absolute inset-0 scale-105 group-hover:scale-110 transition-transform duration-1000">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className={`w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-5xl md:text-6xl mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-sm group-hover:text-foreground transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span>Explore Program</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-8">
                <span className="font-display text-8xl text-foreground/5 leading-none select-none group-hover:text-primary/10 transition-colors duration-700">
                  {service.title.charAt(0)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-card border-t border-border py-20 mt-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-6xl mb-8">NOT SURE WHERE TO START?</h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-fire text-primary-foreground font-bold uppercase tracking-widest hover:shadow-glow transition-all duration-500"
          >
            Get a Consultation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

