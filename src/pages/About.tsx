import { Star, Quote, ChevronLeft, ChevronRight, Film, Award, Users } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/hooks/useContent";
const founderImg = "/images/trainers/founder.jpg";
import trainerHead from "@/assets/trainer-head.jpg";
import trainer1 from "@/assets/trainer1.jpg";
import trainer2 from "@/assets/trainer2.jpg";
import trainer3 from "@/assets/trainer3.jpg";
import trainer4 from "@/assets/trainer4.jpg";
import before1 from "@/assets/before1.jpg";
import after1 from "@/assets/after1.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import bollywood from "@/assets/bollywood.jpg";
import hiphop from "@/assets/hiphop.jpg";
import classical from "@/assets/classical.jpg";
import contemporary from "@/assets/contemporary.jpg";
import genBollywood from "@/assets/dance_bollywood.png";
import genYoga from "@/assets/fitness_yoga.png";
const trainerSateesha = "/images/trainers/trainer_sateesha.jpg";
const trainerSatvika = "/images/trainers/trainer_satvika.jpg";
const trainerAtvika = "/images/trainers/trainer_atvika.png";

const DEFAULT_TRAINERS = [
  { name: "Raju Vadlakonda", role: "Founder & Head Choreographer", exp: "20 Yrs", img: founderImg },
  {
    name: "SATEESHA KUMARI",
    role: "Senior Dance Teacher · Certified Zumba Instructor (15 Years Experience)",
    exp: "15 Yrs",
    img: trainerSateesha,
  },
  { name: "ATVIKA", role: "Dance Teacher (4 Years Experience)", exp: "4 Yrs", img: trainerSatvika },
  { name: "SATVIKA", role: "DANCE TEACHER (3 Years EXPERIENCE)", exp: "3 Yrs", img: trainerAtvika },
];

const DEFAULT_REVIEWS = [
  { name: "SATEESHA KUMARI", role: "Senior Dance Teacher · Certified Zumba Instructor", text: "15 Years Experience" },
  { name: "ATVIKA", role: "Dance Teacher", text: "4 Years Experience" },
  { name: "SATVIKA", role: "DANCE TEACHER", text: "3 Years Experience" },
  { name: "ANJALI IYER", role: "Classical & Bharatnatyam", text: "—" },
];



const About = () => {
  const { content, loading } = useContent();
  const [reviewIdx, setReviewIdx] = useState(0);

  const sec = (key: string) => content.find(c => c.section_key === key);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ── Story ──
  const storyRow = sec("about");
  const storyVisible = storyRow?.is_visible ?? true;
  const storyTitle = storyRow?.title || "FROM THE STAGE. <span class=\"text-gradient-fire\">TO YOUR LIFE.</span>";
  const storyBody = storyRow?.body || "Rajumaster's Rise & Shine was founded with a single belief — dance is not a talent, it's a right. Over 20 years ago, Raju Vadlakonda began teaching in a small Bengaluru studio with a boombox and boundless passion. Today, Rise & Shine is one of the city's most respected dance and fitness institutions.\n\nWe don't believe in cookie-cutter routines. Every class is designed by people who have stood on the biggest stages in India — and they bring that same fire to every single session, regardless of your level or age.";
  const [storyPara1, storyPara2] = storyBody.split("\n\n");

  // ── Founder ──
  const founderRow = sec("about_founder");
  const founderVisible = founderRow?.is_visible ?? true;
  const founderName = founderRow?.title || "Raju Vadlakonda";
  const founderRole = founderRow?.button_text || "Founder Director | Film Choreographer | Certified Zumba Instructor";
  const founderBio = founderRow?.body || "With over 20 years on the stage and behind the camera, Raju Vadlakonda is the visionary force behind Rajumaster's Rise & Shine. A certified Zumba instructor and accomplished film choreographer, Raju has brought rhythm and energy to 5+ major Bollywood and Telugu productions. His philosophy is simple — every person carries a dancer within. His mission is to awaken it.\n\nStarting from humble beginnings in Bengaluru, Raju built Rise & Shine into the city's most trusted dance and fitness destination, training over 100,000 students across all age groups, backgrounds, and skill levels.";
  const founderImgSrc = founderImg; // Enforce local assets instead of founderRow?.image_url
  const founderMeta = (founderRow?.meta as any) || {};
  // Always use local stats instead of Supabase dynamic stats
  const founderStats = [
    "20+|Years Experience",
    "100K+|Students Trained",
    "5+|Films Choreographed",
    "500+|Stage Shows"
  ];

  // ── Trainers ──
  const trainersRow = sec("instructors");
  // If CMS marks this hidden, keep it visible so the static design works even without CMS data.
  const trainersVisible = trainersRow?.is_visible ?? true;
  const trainersTitle = trainersRow?.title || "Trainers Who <span class=\"text-primary\">Push.</span>";
  const rawTrainers = (trainersRow?.meta as any)?.trainers;
  type Trainer = { name: string; role: string; exp: string; img: string };

  const trainersData: Trainer[] = Array.isArray(rawTrainers)
    ? rawTrainers.map((s: string) => {
        const [name, role, img] = s.split("|");
        return { name, role, img: img || trainerHead, exp: "" };
      })
    : (DEFAULT_TRAINERS as Trainer[]);

  // Patch meta-driven trainer entries to match the design defaults.
  // The CMS stores trainers as "Name|Role|ImageUrl"; we normalize the names
  // to the exact casing you requested so the UI always shows the right text.
  const trainersWithPatchedExp = trainersData.map((t: { name: string; role: string; exp: string; img: string }) => {
    const nameMap: Record<string, string> = {
      "Raju Vadlakonda": "Raju Vadlakonda",
      "Sateesha Kumari": "SATEESHA KUMARI",
      "Satvika": "SATVIKA",
      "Atvika": "ATVIKA",
    };

    const expMap: Record<string, string> = {
      "Raju Vadlakonda": "20 Yrs",
      "SATEESHA KUMARI": "15 Yrs",
      "SATVIKA": "4 Yrs",
      "ATVIKA": "3 Yrs",
    };

    const imgMap: Record<string, string> = {
      "SATEESHA KUMARI": String(trainerSateesha),
      "SATVIKA": String(trainerSatvika),
      "ATVIKA": String(trainerAtvika),
    };

    const normalizedName = nameMap[t.name] ?? t.name;

    return {
      ...t,
      name: normalizedName,
      role: t.role,
      exp: expMap[normalizedName] ?? t.exp,
      img: imgMap[normalizedName] ?? t.img,
    };
  });




  // ── Testimonials ──
  const testimonialsRow = sec("testimonials");
  const testimonialsVisible = testimonialsRow?.is_visible ?? true;
  const rawTestimonials = (testimonialsRow?.meta as any)?.quotes;
  const testimonialsList = Array.isArray(rawTestimonials)
    ? rawTestimonials
    : DEFAULT_REVIEWS.map((r) => `${r.name}|${r.text}|${r.role}`);


  const reviews = testimonialsList.map((s: string) => {
    const [name, text, role] = s.split("|");
    return { name, text, role };
  });
  const review = reviews[reviewIdx] || reviews[0] || DEFAULT_REVIEWS[0];

  // ── Gallery ──
  const galleryVisible = true;
  // Always use local images instead of Supabase
  const galleryImages = [
    "/images/images-studio/image.png",
    "/images/images-studio/image copy.png",
    "/images/images-studio/image copy 2.png",
    "/images/images-studio/image copy 3.png",
    "/images/images-studio/image copy 4.png",
    "/images/images-studio/image copy 5.png",
  ];

  // ── Transformations ──
  const transformationsRow = sec("about_transformations");
  const transformationsVisible = transformationsRow?.is_visible ?? true;
  const transformationsTitle = transformationsRow?.title || "Real <span class=\"text-primary\">Transformations.</span>";
  // Always use local images instead of Supabase
  const transformationsList = [
    { img: "/images/images-transformation/transformation-1.png", before: "3 Months", after: "Stronger than ever" },
    { img: "/images/images-transformation/transformation-2.jpg", before: "6 Months", after: "Total life change" }
  ];

  return (
    <>
      {/* STORY */}
      {storyVisible && (
        <section className="container py-20">
          <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Our Story</p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] mb-10 max-w-4xl" dangerouslySetInnerHTML={{ __html: storyTitle }} />
          <div className="grid md:grid-cols-2 gap-10 text-lg text-muted-foreground">
            <p>{storyPara1}</p>
            <p>{storyPara2}</p>
          </div>
        </section>
      )}

      {/* HEAD TRAINER */}
      {founderVisible && (
        <section className="bg-card py-20">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
              <div className="relative mx-auto max-w-sm md:max-w-none w-full">
                <img src={founderImgSrc} alt={founderName} loading="lazy" className="w-full aspect-[4/5] object-cover object-top rounded-none" />
                <div className="absolute bottom-4 right-4 md:-bottom-4 md:-right-4 bg-gradient-fire px-6 py-3 text-primary-foreground font-display text-2xl shadow-lg">20+ YEARS</div>
              </div>
            <div>
                <p className="text-secondary uppercase text-xs tracking-[0.25em] font-bold mb-3">Meet The Founder</p>
                <h2 className="text-6xl sm:text-7xl md:text-8xl mb-2 uppercase leading-none tracking-wide text-white">{founderName}</h2>
                <p className="text-primary uppercase text-sm font-bold tracking-widest mb-4">Founder Director</p>
                
                {/* Custom Boxed Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Film Choreographer", "Certified Zumba Instructor", "20 Years Experience"].map(tag => (
                    <span key={tag} className="px-4 py-2 border border-primary/30 bg-background/40 text-primary text-xs font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bio Paragraphs */}
                {founderBio.split("\n\n").map((para: string, i: number) => (
                  <p key={i} className="text-muted-foreground text-base mb-6 leading-relaxed font-sans">{para}</p>
                ))}

                {/* Square Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                  {founderStats.map((s: string, i: number) => {
                    const [val, label] = s.split("|");
                    return (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-background border border-border/80 rounded-none text-center min-h-[130px] transition-all duration-300 hover:border-primary/40">
                        <h4 className="text-4xl sm:text-5xl text-primary font-bold mb-1 tracking-wide leading-none">{val}</h4>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2 leading-tight max-w-[125px]">
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>
        </section>
      )}

      {/* TRAINER GRID */}
      {trainersVisible && (
        <section className="container py-20">
          <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">The Squad</p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-12" dangerouslySetInnerHTML={{ __html: trainersTitle }} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "RAJU VADLAKONDA", img: String(founderImg), role: "Founder & Head Choreographer · Certified Zumba Instructor (20 Years Experience)", exp: "20 Yrs" },
              { name: "SATEESHA KUMARI", img: String(trainerSateesha), role: "Senior Dance Teacher · Certified Zumba Instructor (15 Years Experience)", exp: "15 Yrs" },
              { name: "ATVIKA", img: String(trainerAtvika), role: "Dance Teacher · 4 Years Experience", exp: "4 Yrs" },
              { name: "SATVIKA", img: String(trainerSatvika), role: "DANCE TEACHER · 3 YEARS EXPERIENCE", exp: "3 Yrs" },
            ].map((t, i) => (

              <div key={i} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
                  <img src={t.img} alt={t.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500" />
                  {t.exp && (
                    <div className="absolute top-3 right-3 bg-gradient-fire text-primary-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider">
                      {t.exp}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-2xl mb-1">{t.name}</h3>
                <p className="text-primary text-xs uppercase tracking-wider font-bold leading-snug">{t.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TRANSFORMATIONS */}
      {transformationsVisible && (
        <section className="bg-card py-20 overflow-hidden">
          <div className="container">
            <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Success Stories</p>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl mb-12" dangerouslySetInnerHTML={{ __html: transformationsTitle }} />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                  <h3 className="font-display text-4xl md:text-5xl leading-tight mb-6">Fitness Meets <span className="text-gradient-fire">Radiance.</span></h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    Our programs aren't just about weight loss or dance steps; they're about gaining confidence, strength, and a new perspective on life. Witness the incredible journey of our students who redefined their limits.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 p-6 bg-background border border-border">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display text-2xl">01</div>
                      <div>
                        <p className="font-bold uppercase text-sm tracking-wider text-primary">Goal Setting</p>
                        <p className="text-muted-foreground text-sm">Personalized roadmaps for every student.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 p-6 bg-background border border-border">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-display text-2xl">02</div>
                      <div>
                        <p className="font-bold uppercase text-sm tracking-wider text-secondary">Consistent Effort</p>
                        <p className="text-muted-foreground text-sm">Guided sessions that keep you motivated daily.</p>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {transformationsList.map((t: any, i: number) => (
                    <div key={i} className={`group relative overflow-hidden aspect-[4/5] bg-card border border-border shadow-2xl ${i % 2 !== 0 ? "sm:mt-16" : ""}`}>
                      <img 
                        src={t.img} 
                        alt={`Transformation ${i + 1}`} 
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                          <div>
                            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">{t.before}</p>
                            <p className="text-white font-display text-2xl uppercase">{t.after}</p>
                          </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-primary px-3 py-1 text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                        {i % 2 === 0 ? "Before & After" : "Success Story"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PHOTO GALLERY */}
      {galleryVisible && (
        <section className="container py-20">
          <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Inside The Studio</p>
          <h2 className="font-display text-5xl md:text-7xl mb-12">Where The <span className="text-primary">Magic Happens.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src: string, i: number) => (
              <div key={i} className={`overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"}`}>
                <img src={src} alt={`Studio ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEEDBACK CAROUSEL */}
      {testimonialsVisible && reviews.length > 0 && (
        <section className="container py-20">
          <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Real Feedback</p>
          <h2 className="font-display text-5xl md:text-7xl mb-12">Stories From <span className="text-primary">The Floor.</span></h2>
          <div className="bg-card border border-border p-10 md:p-16 relative">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-primary/20" />
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-display leading-tight mb-6">"{review.text}"</p>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <div className="font-bold text-primary uppercase tracking-wider">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.role}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setReviewIdx((reviewIdx - 1 + reviews.length) % reviews.length)} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setReviewIdx((reviewIdx + 1) % reviews.length)} className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default About;
