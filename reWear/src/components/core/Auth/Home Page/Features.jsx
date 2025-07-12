import { ArrowRightLeft, Coins, Shield, Users } from "lucide-react";

const features = [
  {
    icon: ArrowRightLeft,
    title: "Easy Exchange",
    description: "Simple 3-step process to exchange your clothes with community members"
  },
  {
    icon: Coins,
    title: "Point System", 
    description: "Earn points for every item you share and redeem them for new pieces"
  },
  {
    icon: Shield,
    title: "Verified Quality",
    description: "All items go through our quality verification process"
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of fashion lovers committed to sustainability"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How ReWear Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join the circular fashion economy and make sustainable style choices that benefit everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-hero rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
