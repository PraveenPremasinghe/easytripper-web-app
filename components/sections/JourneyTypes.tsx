"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const journeyTypes = [
  {
    title: "Join a Group",
    description: "Travel with like-minded explorers",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&h=1080&fit=crop",
    href: "/tours?category=group",
  },
  {
    title: "Authentic Ceylon",
    description: "Rich culture and traditions",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
    href: "/tours?category=culture",
  },
  {
    title: "Adventurous Spirit",
    description: "Thrilling experiences await",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    href: "/tours?category=adventure",
  },
  {
    title: "Barefoot Luxury",
    description: "Premium experiences",
    image: "https://images.unsplash.com/photo-1551632811-561732d7e6d0?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1551632811-561732d7e6d0?w=1920&h=1080&fit=crop",
    href: "/tours?category=luxury",
  },
  {
    title: "Following The Wild",
    description: "Wildlife and national parks",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop",
    href: "/tours?category=wildlife",
  },
  {
    title: "Romantic Serendipity",
    description: "Perfect for couples",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    backgroundImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop",
    href: "/tours?category=romantic",
  },
];

export function JourneyTypes() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Set first card as active by default
    if (swiper) {
      swiper.slideToLoop(0);
      setActiveIndex(0);
    }
  }, [swiper]);

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
    setActiveIndex(realIndex);
  };

  const handleCardClick = (index: number) => {
    if (swiper) {
      swiper.slideToLoop(index);
      setActiveIndex(index);
    }
  };

  const goNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
      {/* Background Image with Smooth Sliding Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {journeyTypes.map((journey, index) => {
          const isActive = activeIndex === index;
          
          return (
            <motion.div
              key={`bg-${index}`}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.05,
              }}
              transition={{
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute inset-0"
              style={{
                zIndex: isActive ? 1 : 0,
              }}
            >
              <Image
                src={journey.backgroundImage}
                alt={journey.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.5 : 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-black"
              />
            </motion.div>
          );
        })}
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center md:text-left"
        >
          <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-light text-white/90">
            The paths are many - you choose.
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-3 sm:mb-4 text-white">
            What&apos;s your journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-white/90">
            Your adventure. Your way.
          </p>
        </motion.div>

        {/* Swiper Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="swiper-button-prev-journey absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary text-white border-2 border-primary flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-primary/90 hover:border-primary/90 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm font-medium touch-manipulation"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={goNext}
            className="swiper-button-next-journey absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary text-white border-2 border-primary flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-primary/90 hover:border-primary/90 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm font-medium touch-manipulation"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>

          {/* Swiper Wrapper */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <Swiper
              onSwiper={setSwiper}
              onSlideChange={handleSlideChange}
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              loopAdditionalSlides={3}
              speed={800}
              watchSlidesProgress={true}
              breakpoints={{
                320: {
                  slidesPerView: 1.3,
                  spaceBetween: 16,
                },
                375: {
                  slidesPerView: 1.4,
                  spaceBetween: 18,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 3.5,
                  spaceBetween: 35,
                },
              }}
              className="journey-swiper"
            >
              {journeyTypes.map((journey, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <SwiperSlide 
                    key={journey.title} 
                    className=" sm:!w-[220px] md:!w-[260px] lg:!w-[300px]"
                  >
                  <div
                    className="w-full cursor-pointer flex justify-center items-start pt-4 sm:pt-6 pb-6 sm:pb-8"
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="flex flex-col items-center text-center w-full">
                      {/* Circular Image Container */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 0.85,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="relative mb-4 sm:mb-6 md:mb-8 lg:mb-12"
                      >
                        <div
                          className={`journey-image-circle relative rounded-full overflow-hidden border-2 md:border-4 border-white shadow-2xl transition-all duration-500 flex-shrink-0 ${
                            isActive 
                              ? "journey-image-active ring-2 md:ring-4 ring-white/80 ring-offset-1 md:ring-offset-4 ring-offset-transparent" 
                              : "journey-image-inactive opacity-75"
                          }`}
                        >
                            <Image
                              src={journey.image}
                              alt={journey.title}
                              fill
                              className="object-cover transition-transform duration-700"
                              style={{
                                transform: isActive ? "scale(1.05)" : "scale(1)",
                              }}
                            />
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                              />
                            )}
                          </div>
                        </motion.div>
                        
                        {/* Text Content */}
                        <motion.div
                          animate={{
                            opacity: isActive ? 1 : 0.75,
                            y: isActive ? 0 : 3,
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-full px-2 sm:px-3 min-h-[70px] sm:min-h-[80px] md:min-h-[90px] flex flex-col justify-start items-center"
                        >
                          <h3
                            className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold transition-all duration-300 leading-tight mb-2 sm:mb-2.5 ${
                              isActive
                                ? "text-white"
                                : "text-white/80"
                            }`}
                          >
                            {journey.title.split(" ").map((word, i) => (
                              <span key={i} className="block">
                                {word}
                              </span>
                            ))}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm md:text-base transition-all duration-300 leading-relaxed whitespace-normal mb-3 sm:mb-4 text-center ${
                              isActive
                                ? "text-white/95"
                                : "text-white/70"
                            }`}
                          >
                            {journey.description}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            className={`group transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 ${
                              isActive
                                ? "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl"
                                : "bg-primary/70 text-white/90 hover:bg-primary/90 opacity-75"
                            }`}
                          >
                            <Link href={journey.href} className="flex items-center gap-1.5 sm:gap-2">
                              <span className="whitespace-nowrap">View More</span>
                              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                            </Link>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

      
      </div>

      <style jsx global>{`
        .journey-swiper {
          overflow: visible !important;
        }
        
        .journey-swiper .swiper-wrapper {
          align-items: center;
          padding: 30px 0 50px 0;
        }
        
        @media (min-width: 640px) {
          .journey-swiper .swiper-wrapper {
            padding: 40px 0 60px 0;
          }
        }
        
        @media (min-width: 1024px) {
          .journey-swiper .swiper-wrapper {
            padding: 50px 0 70px 0;
          }
        }
        
        .journey-swiper .swiper-slide {
          overflow: visible !important;
        }
        
        .journey-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          height: auto;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Circular Image Sizing - Mobile First */
        .journey-image-circle {
          width: 100px;
          height: 100px;
        }
        
        .journey-image-active {
          width: 120px;
          height: 120px;
        }
        
        @media (min-width: 640px) {
          .journey-image-circle {
            width: 120px;
            height: 120px;
          }
          
          .journey-image-active {
            width: 150px;
            height: 150px;
          }
        }
        
        @media (min-width: 768px) {
          .journey-image-circle {
            width: 140px;
            height: 140px;
          }
          
          .journey-image-active {
            width: 180px;
            height: 180px;
          }
        }
        
        @media (min-width: 1024px) {
          .journey-image-circle {
            width: 160px;
            height: 160px;
          }
          
          .journey-image-active {
            width: 220px;
            height: 220px;
          }
        }
        
        @media (min-width: 1280px) {
          .journey-image-circle {
            width: 180px;
            height: 180px;
          }
          
          .journey-image-active {
            width: 260px;
            height: 260px;
          }
        }
        
        .swiper-button-prev-journey,
        .swiper-button-next-journey {
          position: absolute;
        }
        
        .swiper-button-prev-journey.swiper-button-disabled,
        .swiper-button-next-journey.swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
