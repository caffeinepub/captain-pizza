import { SectionContainer } from '../site/SectionContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: siteConfig.contact.address,
    },
    {
      icon: Phone,
      title: 'Phone',
      content: siteConfig.contact.phone,
      link: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Mail,
      title: 'Email',
      content: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      title: 'Hours',
      content: siteConfig.contact.hours,
    },
  ];

  return (
    <SectionContainer id="contact" className="bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Reach out to us anytime!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info) => {
          const Icon = info.icon;
          const content = info.link ? (
            <a href={info.link} className="text-primary hover:underline">
              {info.content}
            </a>
          ) : (
            <div className="text-muted-foreground">{info.content}</div>
          );

          return (
            <Card key={info.title}>
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>{content}</CardContent>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
