import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/siteConfig';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import { useNavigate } from '@tanstack/react-router';

export function HomeHeroSection() {
  const navigate = useNavigate();

  const openZomato = () => {
    window.open(siteConfig.zomatoUrl, '_blank');
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/captain-pizza-hero.dim_1600x900.png"
          alt="Delicious pizza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-primary">{siteConfig.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Authentic pizzas crafted with passion, baked to perfection. Experience the taste that makes every bite
            memorable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button size="lg" onClick={() => navigate({ to: '/menu' })} className="text-lg px-8">
              Browse Menu
            </Button>
            <Button size="lg" variant="outline" onClick={openZomato} className="text-lg px-8">
              Order on Zomato
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <SiFacebook className="h-6 w-6" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <SiInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
