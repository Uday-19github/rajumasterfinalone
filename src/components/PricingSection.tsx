import { Info, Check, Sparkles } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { useState } from "react";

interface PricingSectionProps {
  type?: "dance" | "fitness" | "all";
}

const PRICING_DATA = [
  {
    id: "fitness",
    category: "Adults Zumba Fitness",
    subtitle: "High-energy cardio dance",
    icon: "💃",
    regular: [
      { duration: "Monthly", price: "₹2,500" },
      { duration: "3 Months", price: "₹6,500", original: "₹7,500", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹12,000", original: "₹15,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹23,000", original: "₹30,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly", price: "₹2,000" },
      { duration: "Weekend 3 Months", price: "₹5,000" },
    ]
  },
  {
    id: "dance",
    category: "Adults Dance Classes",
    subtitle: "Master the art of movement",
    icon: "🕺",
    regular: [
      { duration: "Monthly", price: "₹2,500" },
      { duration: "3 Months", price: "₹6,500", original: "₹7,500", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹12,000", original: "₹15,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹23,000", original: "₹30,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly (8 Sessions)", price: "₹2,000" },
      { duration: "Weekend 3 Months", price: "₹5,000" },
    ]
  },
  {
    id: "dance",
    category: "Children Dance",
    subtitle: "Junior rhythmic stars",
    icon: "⭐",
    regular: [
      { duration: "Monthly", price: "₹2,000" },
      { duration: "3 Months", price: "₹5,000", original: "₹6,000", discount: "Save ₹1,000", featured: true },
      { duration: "6 Months", price: "₹9,000", original: "₹12,000", discount: "Save ₹3,000" },
      { duration: "12 Months", price: "₹17,000", original: "₹24,000", discount: "Save ₹7,000" },
    ],
    weekend: [
      { duration: "Weekend Monthly (8 Sessions)", price: "₹1,500" },
      { duration: "Weekend 3 Months", price: "₹4,000" },
    ]
  },
];

export const PricingSection = ({ type = "all" }: PricingSectionProps) => {
  const { content, loading } = useContent();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (loading) return null;

  const sec = (key: string) => content.find(c => c.section_key === key);
  const pricingRow = sec("pricing");
  if (pricingRow && pricingRow.is_visible === false) return null;

  const filteredData = type === "all" 
    ? PRICING_DATA 
    : PRICING_DATA.filter(item => item.id === type);

  if (filteredData.length === 0) return null;

  // Initialize active tab
  const currentCategory = activeCategory || filteredData[0].category;
  const currentData = filteredData.find(d => d.category === currentCategory) || filteredData[0];

  return (
    <section className="bg-background py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3" />

      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary uppercase text-xs tracking-widest font-bold">
            <Sparkles className="w-4 h-4" /> Investment in Yourself
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
            {type === "dance" ? "DANCE " : type === "fitness" ? "FITNESS " : ""}PRICING <span className="text-gradient-fire">PLANS.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Choose a plan that fits your schedule. Save more with our multi-month commitment packages.
          </p>
        </div>

        {/* Tabs for multiple categories */}
        {filteredData.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filteredData.map(cat => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                  currentCategory === cat.category
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(255,100,0,0.3)]"
                    : "bg-card border border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* Regular Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {currentData.regular.map((plan, idx) => (
            <div 
              key={idx}
              className={`relative flex flex-col bg-card/50 backdrop-blur-sm rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                plan.featured 
                  ? "border-primary/50 shadow-[0_0_30px_rgba(255,100,0,0.15)] md:-translate-y-4 z-10" 
                  : "border-border/50 hover:border-primary/30"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 pb-6 border-b border-border/30 text-center">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{plan.duration}</h3>
                {plan.discount ? (
                  <p className="text-primary font-bold text-sm h-5">{plan.discount}</p>
                ) : (
                  <p className="h-5"></p>
                )}
                
                <div className="my-6">
                  {plan.original && (
                    <p className="text-muted-foreground line-through text-sm mb-1">{plan.original}</p>
                  )}
                  <p className="font-display text-5xl text-foreground">
                    {plan.price}
                  </p>
                </div>
                
                <a 
                  href="/contact"
                  className={`inline-block w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                    plan.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25"
                      : "bg-muted text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  Choose Plan
                </a>
              </div>

              <div className="p-8 pt-6 flex-grow">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>Access to regular {currentData.category.toLowerCase().replace('adults ', '').replace('children ', '')} batches</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>Expert certified instructors</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>Studio amenities access</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Weekend Batches Strip */}
        {currentData.weekend.length > 0 && (
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-secondary/10 via-card to-secondary/10 border border-secondary/20 rounded-3xl p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="font-display text-3xl mb-2 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  Weekend Batches
                </h4>
                <p className="text-muted-foreground text-sm">Perfect for busy schedules. Limited slots available.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {currentData.weekend.map(plan => (
                  <div key={plan.duration} className="bg-background/80 rounded-2xl p-4 border border-border/50 min-w-[200px] text-center hover:border-secondary/50 transition-colors">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{plan.duration}</p>
                    <p className="font-display text-2xl text-secondary">{plan.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center flex items-center justify-center gap-2 text-muted-foreground text-sm opacity-70">
          <Info className="w-4 h-4" /> No registration fee. All taxes inclusive.
        </div>
      </div>
    </section>
  );
};

