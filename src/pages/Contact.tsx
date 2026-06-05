import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Youtube } from "lucide-react";
import { toast } from "sonner";
import { useContent } from "@/hooks/useContent";

const services = [
  "Dance", "Fitness", "Acting", "Events",
];

const Contact = () => {
  const { sec } = useContent();
  const contactRow = sec("contact");
  const contactMeta = (contactRow?.meta as any) || {};

  const [form, setForm] = useState({
    name: "", phone: "", gender: "", age: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      toast.error("Please fill name, phone, and service.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xjglwepg", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast.success("Booked! We'll call you within 24 hours.", {
          description: `Welcome to Rise & Shine, ${form.name}.`,
        });
        setForm({ name: "", phone: "", gender: "", age: "", service: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: "Visit", val: contactMeta.contactAddress || "3rd Floor, Plot no-4, St No. 2, Manikonda, Hyderabad 500089" },
    { icon: Phone, label: "Call", val: contactMeta.contactPhone || "099081 00855" },
    { icon: Mail, label: "Email", val: contactMeta.contactEmail || "hello@riseandshine.in" },
    { icon: Clock, label: "Hours", val: contactMeta.contactHours || "Mon–Sat: 6am – 10:30pm  •  Sun: 8am – 6pm" },
  ];

  const socials = [
    { Icon: Instagram, href: contactMeta.contactInstagram || "https://instagram.com/rajumaster_riseandshine" },
    { Icon: Facebook, href: contactMeta.contactFacebook || "https://facebook.com/rajumaster.riseandshine" },
    { Icon: Youtube, href: contactMeta.contactYoutube || "https://youtube.com/@rajumaster_riseandshine" },
    { 
      Icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ), 
      href: contactRow?.button_link || "https://wa.me/919908100855" 
    }
  ];

  return (
    <section className="container py-20">
      <p className="text-secondary uppercase text-xs tracking-[0.3em] font-bold mb-3">Get In Touch</p>
      <h1 className="font-display text-4xl sm:text-6xl md:text-8xl leading-[0.9] mb-6">
        LET'S MAKE <span className="text-gradient-fire">SOMETHING MOVE.</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-16">
        Book a free trial class, ask about choreography, or just say hi. We respond within 24 hours.
      </p>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* CONTACT INFO */}
        <aside className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border p-8">
            <h2 className="font-display text-3xl text-primary mb-6">Studio HQ</h2>
            <ul className="space-y-5">
              {contactInfo.map((c) => (
                <li key={c.label} className="flex gap-4">
                  <div className="w-11 h-11 shrink-0 bg-gradient-fire flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold text-secondary mb-1">{c.label}</div>
                    <div className="text-foreground">{c.val}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border p-8">
            <h3 className="font-display text-2xl mb-4">Follow The Beat</h3>
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-border flex items-center justify-center hover:bg-primary hover:border-primary transition"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gradient-fire p-8 text-primary-foreground">
            <h3 className="font-display text-3xl mb-2">First Class Free.</h3>
            <p className="opacity-90">No commitment. No fees. Just show up and try us out.</p>
          </div>
        </aside>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card border border-border p-6 md:p-10 space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-secondary">Full Name *</label>
            <input
              type="text" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition"
              placeholder="Your name"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-secondary">Phone *</label>
              <input
                type="tel" required value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="+91 ..."
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-secondary">Age</label>
              <input
                type="number" min={3} max={99} value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition"
                placeholder="Your age"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-3 text-secondary">Gender</label>
            <div className="flex gap-6 flex-wrap">
              {["Female", "Male"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio" name="gender" value={g}
                    checked={form.gender === g}
                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-secondary">Service Interested In *</label>
            <select
              required value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition"
            >
              <option value="">Select a service…</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2 text-secondary">Your Message</label>
            <textarea
              rows={5} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-primary transition resize-none"
              placeholder="Tell us your goals, schedule, or anything else…"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-10 py-4 bg-gradient-fire text-primary-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-glow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Book My Free Class"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
