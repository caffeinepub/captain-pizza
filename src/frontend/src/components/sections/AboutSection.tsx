import { SectionContainer } from '../site/SectionContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Pizza, Flame, Heart } from 'lucide-react';

export function AboutSection() {
  const features = [
    {
      icon: Pizza,
      title: 'Fresh Ingredients',
      description: 'We use only the finest, locally-sourced ingredients to create our signature pizzas.',
    },
    {
      icon: Flame,
      title: 'Wood-Fired Perfection',
      description: 'Each pizza is baked in our traditional wood-fired oven for that authentic taste.',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every pizza is crafted with passion and care by our experienced pizza chefs.',
    },
  ];

  return (
    <SectionContainer id="about">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">About Captain Pizza</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Since our founding, we've been dedicated to serving the most delicious pizzas in town. Our secret? Quality
          ingredients, traditional techniques, and a whole lot of passion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground leading-relaxed">
          At Captain Pizza, we believe that great pizza brings people together. Whether you're celebrating a special
          occasion or just craving a delicious meal, we're here to serve you the best pizza experience. Our commitment
          to quality and customer satisfaction has made us a favorite in the community.
        </p>
      </div>
    </SectionContainer>
  );
}
