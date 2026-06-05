export { supabase } from "./supabase-client";

export interface SectionConfig {
  label: string;
  icon: string;
  color: string;
  description: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textarea" | "image" | "url" | "list" | "image-list" | "pair-list";
    placeholder?: string;
    max?: number;
    hint?: string;
  }[];
}

export interface SeedRow {
  section_key: string;
  section_label: string;
  title: string | null;
  body: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  is_visible: boolean;
  sort_order: number;
  meta: any;
}

// Tailwind background color class per section key (used by admin UI)
export const SECTION_COLORS: Record<string, string> = {
  hero: "bg-purple-500",
  stats: "bg-indigo-500",
  testimonials: "bg-purple-400",

  services_hero: "bg-blue-500",

  about: "bg-teal-500",
  about_founder: "bg-teal-600",
  instructors: "bg-blue-500",
  about_transformations: "bg-orange-500",

  dance: "bg-pink-500",
  dance_hiphop: "bg-pink-600",
  dance_bollywood: "bg-pink-600",
  dance_classical: "bg-pink-600",
  dance_contemporary: "bg-pink-600",

  fitness: "bg-orange-500",
  fitness_zumba: "bg-orange-600",
  fitness_aerobics: "bg-orange-600",
  fitness_yoga: "bg-orange-600",
  fitness_weightloss: "bg-orange-600",
  fitness_toning: "bg-orange-600",

  events: "bg-yellow-500",
  events_professional: "bg-yellow-600",
  events_sangeet: "bg-yellow-600",
  events_corporate: "bg-yellow-600",
  events_flashmob: "bg-yellow-600",
  events_all: "bg-yellow-600",

  pricing_spark: "bg-green-500",
  pricing_blaze: "bg-green-600",
  pricing_inferno: "bg-red-500",

  gallery: "bg-pink-500",
  dance_gallery: "bg-pink-600",
  fitness_gallery: "bg-orange-600",
  events_gallery: "bg-yellow-600",
  acting_gallery: "bg-purple-600",

  contact: "bg-slate-500",
};

// ── Section Configs ───────────────────────────────────────────────
export const SECTION_CONFIGS: Record<string, SectionConfig> = {
  hero: {
    label: "Home — Hero Banner",
    icon: "🎯",
    color: "bg-purple-500",
    description: "Main headline and intro on the Home page",
    fields: [
      { key: "title", label: "Headline", type: "text", placeholder: "MOVE LIKE YOU MEAN IT." },
      { key: "body", label: "Subtitle", type: "textarea" },
      { key: "image_url", label: "Background Image", type: "image" },
      { key: "button_text", label: "CTA Button Text", type: "text" },
      { key: "button_link", label: "CTA Button URL", type: "url" },
    ],
  },
  stats: {
    label: "Home — Stats Strip",
    icon: "📊",
    color: "bg-indigo-500",
    description: "Fire-themed stats strip on the Home page",
    fields: [{ key: "statItems", label: "Stats (NUMBER|LABEL)", type: "pair-list", max: 5 }],
  },
  testimonials: {
    label: "Home — Testimonials",
    icon: "💬",
    color: "bg-purple-400",
    description: "Scrolling feedback marquee on the Home page",
    fields: [{ key: "quotes", label: "Quotes (one per line)", type: "list", max: 15 }],
  },
  services_hero: {
    label: "Services — Hero",
    icon: "🚀",
    color: "bg-blue-500",
    description: "Intro banner on the Services listing page",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  about: {
    label: "About — Our Story",
    icon: "📖",
    color: "bg-teal-500",
    description: "Main history/story on the About page",
    fields: [
      { key: "title", label: "Section Heading", type: "text" },
      { key: "body", label: "Story (two paragraphs separated by blank line)", type: "textarea" },
    ],
  },
  about_founder: {
    label: "About — Founder",
    icon: "👤",
    color: "bg-teal-600",
    description: "Raju Vadlakonda's profile and bio",
    fields: [
      { key: "title", label: "Founder Name", type: "text" },
      { key: "body", label: "Bio", type: "textarea" },
      { key: "image_url", label: "Portrait Photo", type: "image" },
      { key: "button_text", label: "Role Title", type: "text" },
      { key: "founderStats", label: "Stats (e.g. 20+|Years Experience)", type: "list" },
    ],
  },
  instructors: {
    label: "About — Trainers",
    icon: "👥",
    color: "bg-blue-500",
    description: "The team grid on the About page",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "trainers", label: "Trainers (Name|Role|ImageURL)", type: "list", max: 8 },
    ],
  },
  about_transformations: {
    label: "About — Transformations",
    icon: "✨",
    color: "bg-orange-500",
    description: "Success stories / Before & After",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "transformations", label: "Stories (Image|Before|After)", type: "list", max: 6 },
    ],
  },
  dance: {
    label: "Dance — Intro",
    icon: "💃",
    color: "bg-pink-500",
    description: "Hero/Intro for the Dance page",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "body", label: "Intro Paragraph", type: "textarea" },
    ],
  },
  dance_hiphop: {
    label: "Dance — Hip-Hop",
    icon: "🎤",
    color: "bg-pink-600",
    description: "Hip-Hop details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  dance_bollywood: {
    label: "Dance — Bollywood",
    icon: "🎬",
    color: "bg-pink-600",
    description: "Bollywood details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  dance_classical: {
    label: "Dance — Classical",
    icon: "🏛️",
    color: "bg-pink-600",
    description: "Classical details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  dance_contemporary: {
    label: "Dance — Contemporary",
    icon: "🌊",
    color: "bg-pink-600",
    description: "Contemporary details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  fitness: {
    label: "Fitness — Intro",
    icon: "🏋️",
    color: "bg-orange-500",
    description: "Hero/Intro for the Fitness page",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "body", label: "Intro Paragraph", type: "textarea" },
    ],
  },
  fitness_zumba: {
    label: "Fitness — Zumba",
    icon: "🎵",
    color: "bg-orange-600",
    description: "Zumba details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  fitness_aerobics: {
    label: "Fitness — Aerobics",
    icon: "🏃",
    color: "bg-orange-600",
    description: "Aerobics details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  fitness_yoga: {
    label: "Fitness — Yoga",
    icon: "🧘",
    color: "bg-orange-600",
    description: "Yoga details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  fitness_weightloss: {
    label: "Fitness — Weight Reduction",
    icon: "📉",
    color: "bg-orange-600",
    description: "Weight Reduction details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  fitness_toning: {
    label: "Fitness — Body Toning",
    icon: "💪",
    color: "bg-orange-600",
    description: "Body Toning details",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  events: {
    label: "Events — Intro",
    icon: "🎪",
    color: "bg-yellow-500",
    description: "Hero/Intro for the Events page",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "body", label: "Intro Paragraph", type: "textarea" },
    ],
  },
  events_professional: {
    label: "Events — Pro Group",
    icon: "🌟",
    color: "bg-yellow-600",
    description: "Professional Group troupe",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  events_sangeet: {
    label: "Events — Sangeet",
    icon: "💒",
    color: "bg-yellow-600",
    description: "Wedding choreography",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  events_corporate: {
    label: "Events — Corporate",
    icon: "🏢",
    color: "bg-yellow-600",
    description: "Corporate shows",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  events_flashmob: {
    label: "Events — Flash Mobs",
    icon: "⚡",
    color: "bg-yellow-600",
    description: "Surprise performances",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  events_all: {
    label: "Events — All Others",
    icon: "🌍",
    color: "bg-yellow-600",
    description: "Miscellaneous events",
    fields: [
      { key: "title", label: "Name", type: "text" },
      { key: "body", label: "Description", type: "textarea" },
    ],
  },
  pricing_spark: {
    label: "Pricing — Spark",
    icon: "✨",
    color: "bg-green-500",
    description: "Entry-level membership",
    fields: [
      { key: "title", label: "Tier Name", type: "text" },
      { key: "pricingPrice", label: "Price", type: "text" },
      { key: "pricingPer", label: "Per", type: "text" },
      { key: "pricingPerks", label: "Perks (one per line)", type: "list" },
    ],
  },
  pricing_blaze: {
    label: "Pricing — Blaze",
    icon: "🔥",
    color: "bg-green-600",
    description: "Most popular membership",
    fields: [
      { key: "title", label: "Tier Name", type: "text" },
      { key: "pricingPrice", label: "Price", type: "text" },
      { key: "pricingPer", label: "Per", type: "text" },
      { key: "pricingPerks", label: "Perks (one per line)", type: "list" },
    ],
  },
  pricing_inferno: {
    label: "Pricing — Inferno",
    icon: "🌋",
    color: "bg-red-500",
    description: "VIP/Full-access membership",
    fields: [
      { key: "title", label: "Tier Name", type: "text" },
      { key: "pricingPrice", label: "Price", type: "text" },
      { key: "pricingPer", label: "Per", type: "text" },
      { key: "pricingPerks", label: "Perks (one per line)", type: "list" },
    ],
  },
  gallery: {
    label: "Gallery — About Page",
    icon: "🖼️",
    color: "bg-pink-500",
    description: "Main studio photo gallery",
    fields: [
      { key: "title", label: "Section Title", type: "text" },
      { key: "media", label: "Photos (up to 12)", type: "image-list", max: 12 },
    ],
  },
  dance_gallery: {
    label: "Gallery — Dance Page",
    icon: "🎥",
    color: "bg-pink-600",
    description: "Videos/Photos for Dance",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "media", label: "Photos & Videos", type: "image-list", max: 20 },
    ],
  },
  fitness_gallery: {
    label: "Gallery — Fitness Page",
    icon: "🎥",
    color: "bg-orange-600",
    description: "Videos/Photos for Fitness",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "media", label: "Photos & Videos", type: "image-list", max: 20 },
    ],
  },
  events_gallery: {
    label: "Gallery — Events Page",
    icon: "🎥",
    color: "bg-yellow-600",
    description: "Videos/Photos for Events",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "media", label: "Photos & Videos", type: "image-list", max: 20 },
    ],
  },
  acting_gallery: {
    label: "Gallery — Acting Page",
    icon: "🎥",
    color: "bg-purple-600",
    description: "Videos/Photos for Acting",
    fields: [
      { key: "title", label: "Heading", type: "text" },
      { key: "media", label: "Photos & Videos", type: "image-list", max: 20 },
    ],
  },
  contact: {
    label: "Global — Contact Info",
    icon: "📞",
    color: "bg-slate-500",
    description: "Footer and contact page details",
    fields: [
      { key: "contactAddress", label: "Address", type: "text" },
      { key: "contactPhone", label: "Phone", type: "text" },
      { key: "contactEmail", label: "Email", type: "text" },
      { key: "contactHours", label: "Hours", type: "text" },
      { key: "contactInstagram", label: "Instagram URL", type: "url" },
      { key: "contactFacebook", label: "Facebook URL", type: "url" },
      { key: "contactYoutube", label: "YouTube URL", type: "url" },
    ],
  },
};

// ── Full seed ─────────────────────────────────────────────────────
export const PULSE_SEED: SeedRow[] = [
  { section_key: "hero", section_label: "Home — Hero", title: "MOVE LIKE YOU MEAN IT.", body: "20 years. 100,000 students. 500+ stages. Rajumaster's Rise & Shine is Bengaluru's premier destination for dance, fitness, acting, and events. Step in. Sweat hard. Shine bright.", image_url: "", button_text: "Book a Free Class", button_link: "/contact", is_visible: true, sort_order: 1, meta: {} },
  { section_key: "stats", section_label: "Home — Stats", title: "", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 2, meta: { statItems: ["20+|Years Experience", "100K+|Students", "5+|Movies Choreography", "5|Trainers", "500+|Stage Shows"] } },
  { section_key: "testimonials", section_label: "Home — Testimonials", title: "Loved by Thousands.", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 3, meta: { quotes: ["The classes run five days a week — gives me exactly the discipline I needed. — Priya S.", "Best dance and fitness studio in Bengaluru! Rajumaster knows exactly how to push you. — Rohan K.", "Different kinds of exercises mixed with music — best workout I've ever had! — Anjali M.", "Best Zumba class in Manikonda, hands down. My whole family joined now! — Meera T.", "Joined for fitness, stayed for the incredible family atmosphere. — Arjun D.", "World-class trainers, world-class energy. Changed my life in 3 months. — Kavya R.", "Rajumaster choreographed our entire sangeet. Everyone was blown away! — Deepika W.", "My daughter has been here for 2 years and the transformation is unbelievable. — Sunita B.", "5 movies worth of experience and it shows. The moves they teach are next level. — Vikram C.", "The 500+ shows legacy is real. You can feel the professionalism in every class. — Aisha F.", "Never thought I'd enjoy working out until I found Zumba here. — Lakshmi P.", "The flash mob Rajumaster organized for my proposal was absolutely perfect! — Rahul N."] } },
  { section_key: "services_hero", section_label: "Services — Hero", title: "CHOOSE YOUR STAGE.", body: "Four world-class disciplines under one roof. Whether you're chasing fitness, fame, or pure joy — we've got the floor for you.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 4, meta: {} },
  { section_key: "about", section_label: "About — Story", title: "FROM THE STAGE. <span class=\"text-gradient-fire\">TO YOUR LIFE.</span>", body: "Rajumaster's Rise & Shine was founded with a single belief — dance is not a talent, it's a right. Over 20 years ago, Raju Vadlakonda began teaching in a small Bengaluru studio with a boombox and boundless passion. Today, Rise & Shine is one of the city's most respected dance and fitness institutions.\\n\\nWe don't believe in cookie-cutter routines. Every class is designed by people who have stood on the biggest stages in India — and they bring that same fire to every single session, regardless of your level or age.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 5, meta: {} },
  { section_key: "about_founder", section_label: "About — Founder", title: "Raju Vadlakonda", body: "With over 20 years on the stage and behind the camera, Raju Vadlakonda is the visionary force behind Rajumaster's Rise & Shine. A certified Zumba instructor and accomplished film choreographer, Raju has brought rhythm and energy to 5+ major Bollywood and Telugu productions.\\n\\nStarting from humble beginnings in Bengaluru, Raju built Rise & Shine into the city's most trusted dance and fitness destination, training over 100,000 students across all age groups.", image_url: "", button_text: "Founder Director | Film Choreographer | Certified Zumba Instructor", button_link: null, is_visible: true, sort_order: 6, meta: { founderStats: ["20+|Years Experience", "100K+|Students Trained", "5+|Films Choreographed", "500+|Stage Shows"] } },
  { section_key: "instructors", section_label: "About — Trainers", title: "Trainers Who <span class=\"text-primary\">Push.</span>", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 7, meta: { trainers: ["Raju Vadlakonda|Founder & Head Choreographer|", "Sateesha Kumari|Senior Dance Teacher|", "Satvika|Dance Teacher|", "Atvika|Dance Teacher|"] } },
  { section_key: "about_transformations", section_label: "About — Transformations", title: "Real <span class=\"text-primary\">Transformations.</span>", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 8, meta: { transformations: ["/images/images-transformation/transformation-1.png|3 Months|Stronger than ever", "/images/images-transformation/transformation-2.jpg|6 Months|Total life change"] } },
  { section_key: "dance", section_label: "Dance — Intro", title: "DANCE <span class=\"text-gradient-fire\">STUDIO.</span>", body: "Four powerful dance styles taught by India's most recognized choreographers. From the streets of Brooklyn to the temples of Tamil Nadu — express it all.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 9, meta: {} },
  { section_key: "dance_hiphop", section_label: "Dance — Hip-Hop", title: "Hip-Hop", body: "Master the foundations of breaking, popping, locking, and freestyle. Built for raw self-expression with serious attitude.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 10, meta: {} },
  { section_key: "dance_bollywood", section_label: "Dance — Bollywood", title: "Bollywood", body: "High-energy cinematic choreography blending classical roots with modern beats. Perfect for performers and party-floor superstars.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 11, meta: {} },
  { section_key: "dance_classical", section_label: "Dance — Classical", title: "Classical", body: "Traditional Bharatnatyam and Kathak training with strict adherence to grace, mudras, and storytelling tradition.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 12, meta: {} },
  { section_key: "dance_contemporary", section_label: "Dance — Contemporary", title: "Contemporary", body: "Fluid, emotional, boundary-breaking. Combining ballet technique with raw modern expression for storytellers.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 13, meta: {} },
  { section_key: "fitness", section_label: "Fitness — Intro", title: "FITNESS <span class=\"text-gradient-fire\">CENTER.</span>", body: "Forget the boring gym grind. Our fitness programs blend dance, strength, mindfulness, and high-energy cardio for transformations that actually last.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 14, meta: {} },
  { section_key: "fitness_zumba", section_label: "Fitness — Zumba", title: "Zumba", body: "Latin-inspired dance fitness party. Burn 500–800 calories without even realising it. Fun, high-energy, and addictive.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 15, meta: {} },
  { section_key: "fitness_aerobics", section_label: "Fitness — Aerobics", title: "Aerobics", body: "Structured, high-energy cardio workout set to motivating music. Focus on cardiovascular endurance and lung capacity.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 16, meta: {} },
  { section_key: "fitness_yoga", section_label: "Fitness — Yoga", title: "Yoga", body: "Traditional Hatha and Vinyasa practices fused with modern flow. Focus on flexibility, core strength, and mental clarity.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 17, meta: {} },
  { section_key: "fitness_weightloss", section_label: "Fitness — Weight Loss", title: "Weight Reduction", body: "HIIT principles with dance choreography target fat loss, improve metabolism, and build lean muscle. Results driven.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 18, meta: {} },
  { section_key: "fitness_toning", section_label: "Fitness — Toning", title: "Body Toning", body: "Sculpt, define, and strengthen specific muscle groups using resistance training and body-weight exercises.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 19, meta: {} },
  { section_key: "events", section_label: "Events — Intro", title: "EVENTS & <span class=\"text-gradient-fire\">STAGES.</span>", body: "From intimate sangeet nights to massive corporate galas — we choreograph moments that audiences remember forever.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 20, meta: {} },
  { section_key: "events_professional", section_label: "Events — Pro Group", title: "Professional Group", body: "Available for high-profile stage shows, movie promotional events, product launches, TV appearances, and cultural festivals.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 21, meta: {} },
  { section_key: "events_sangeet", section_label: "Events — Sangeet", title: "Sangeet", body: "Complete performances for the bride, groom, and family. We choreograph the cousins and even the uncle who can't dance.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 22, meta: {} },
  { section_key: "events_corporate", section_label: "Events — Corporate", title: "Corporate Events", body: "Annual days, product launches, team-building workshops — performances that engage and energise your corporate audience.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 23, meta: {} },
  { section_key: "events_flashmob", section_label: "Events — Flash Mobs", title: "Flash Mobs", body: "Perfectly executed flash mobs for marriage proposals, birthday surprises, and brand activations. Location scouting included.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 24, meta: {} },
  { section_key: "events_all", section_label: "Events — All Others", title: "All Events", body: "School annual days, college fests, birthday parties — professional-quality dance entertainment for every occasion.", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 25, meta: {} },
  { section_key: "pricing_spark", section_label: "Pricing — Spark", title: "Spark", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 26, meta: { pricingPrice: "₹2,499", pricingPer: "/month", pricingPerks: ["2 classes per week", "Choose any 1 form", "Studio locker access", "Community events"] } },
  { section_key: "pricing_blaze", section_label: "Pricing — Blaze", title: "Blaze", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 27, meta: { pricingPrice: "₹4,499", pricingPer: "/month", pricingPerks: ["Unlimited classes", "Any form, any time", "1 personal session/mo", "Pulse merch kit", "Priority booking"] } },
  { section_key: "pricing_inferno", section_label: "Pricing — Inferno", title: "Inferno", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 28, meta: { pricingPrice: "₹7,999", pricingPer: "/month", pricingPerks: ["Everything in Blaze", "4 personal sessions/mo", "Stage performance slot", "Nutritionist consult", "Bring-a-friend pass"] } },
  { section_key: "gallery", section_label: "Gallery — About", title: "Where The Magic Happens.", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 29, meta: {} },
  { section_key: "dance_gallery", section_label: "Gallery — Dance", title: "Dance Gallery", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 30, meta: {} },
  { section_key: "fitness_gallery", section_label: "Gallery — Fitness", title: "Fitness Gallery", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 31, meta: {} },
  { section_key: "events_gallery", section_label: "Gallery — Events", title: "Events Gallery", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 32, meta: {} },
  { section_key: "acting_gallery", section_label: "Gallery — Acting", title: "Acting Gallery", body: "", image_url: null, button_text: null, button_link: null, is_visible: true, sort_order: 33, meta: {} },
  { section_key: "contact", section_label: "Global — Contact", title: "Contact Us", body: "", image_url: null, button_text: "WhatsApp Us", button_link: "https://wa.me/919908100855", is_visible: true, sort_order: 34, meta: { contactAddress: "3rd Floor, Plot no-4, Street No. 2, beside Babai hotel, Lalamma Gardens, Manikonda, Hyderabad 500089", contactPhone: "099081 00855", contactEmail: "hello@riseandshine.in", contactHours: "Mon–Sat: 6am – 10:30pm  •  Sun: 8am – 6pm", contactInstagram: "", contactFacebook: "", contactYoutube: "" } },
];

// SQL to add the meta column (run once in Supabase SQL Editor):
export const META_COLUMN_SQL = `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS meta jsonb DEFAULT '{}'::jsonb;`;

