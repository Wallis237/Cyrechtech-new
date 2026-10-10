import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AnimationWrapper from './AnimationWrapper';
import { useGallery } from '@/hooks/useContent';
import { useLanguage } from "@/i18n/LanguageProvider";

interface GalleryItem {
  id: number | string;
  title: string;
  category: string;
  image: string;
}

const fallbackItems: GalleryItem[] = [
  { id: 1, title: "Nature Photography", category: "Photography", image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80" },
  { id: 2, title: "Landscape", category: "Photography", image: "/lovable-uploads/e85332d2-9f30-40f5-9d44-f9bf93ebb34e.png" },
  { id: 3, title: "Brand Logo Design", category: "Graphic Design", image: "/lovable-uploads/3028df71-0167-4088-a78f-40507a4ea535.png" },
  { id: 4, title: "Website Mockup", category: "Web Design", image: "/lovable-uploads/355fa138-0d54-4077-ae28-5cca71cde6d5.png" },
  { id: 5, title: "Portrait", category: "Photography", image: "/lovable-uploads/66c21b98-7aa0-4de3-8254-61f261dc0c8d.png" },
  { id: 6, title: "Studio Shoot", category: "Photography", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80" },
];

const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const { data: rows } = useGallery();
  const { t } = useLanguage();
  const galleryItems: GalleryItem[] = rows?.length
    ? rows.map((r) => ({ id: r.id, title: r.title, category: r.category, image: r.image }))
    : fallbackItems;


  return (
    <section id="gallery" className="section-padding relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <AnimationWrapper animation="fadeUp">
            <div>
              <div className="eyebrow">// {t("Gallery")}</div>
              <h2 className="mt-3 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                {t("Visual")} <span className="accent-italic">{t("Chronicles")}</span>
              </h2>
            </div>
          </AnimationWrapper>
          <AnimationWrapper animation="fadeUp" delay={150}>
            <p className="text-muted-foreground max-w-md lg:ml-auto">
              {t("A curated collection of photography and design work — moments captured, brands crafted.")}
            </p>
          </AnimationWrapper>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <AnimationWrapper key={item.id} animation="fadeUpScale" delay={100 + index * 80}>
              <button
                onClick={() => setSelectedItem(item)}
                className={`surface-card-hover overflow-hidden group relative w-full text-left ${
                  index === 0 || index === 3 ? 'md:row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <img
                  src={item.image}
                  alt={t(item.title)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{t(item.category)}</div>
                  <div className="mt-1 font-display font-semibold text-lg">{t(item.title)}</div>
                </div>
              </button>
            </AnimationWrapper>
          ))}
        </div>
      </div>

      <Dialog open={selectedItem !== null} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-[92vw] p-2 bg-background/95 backdrop-blur-xl border-border">
          {selectedItem && (
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={t(selectedItem.title)}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 px-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{t(selectedItem.category)}</div>
                <div className="mt-1 font-display font-semibold text-xl">{t(selectedItem.title)}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
