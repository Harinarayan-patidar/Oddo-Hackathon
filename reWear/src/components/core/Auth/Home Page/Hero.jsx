import { Button } from "../../../../Ui/Button";
// import { ArrowRight, Users, TrendingUp } from "lucide-react";
// import heroImage from "../../../../assets/heroImage"; // Replace with actual hero image path

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        // style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sage/80 via-earth/60 to-warm/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          ReWear
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Transform your wardrobe sustainably. Exchange, earn points, and discover amazing pre-loved fashion from our community.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="bg-white text-richblack-400 hover:bg-white/90 transition-smooth">
            Start Trading
            {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 transition-smooth">
            Learn More
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10,000+</div>
            <div className="text-white/80">Items Exchanged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">5,000+</div>
            <div className="text-white/80">Community Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-white/80">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
