"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const reviews = [
    { rating: 5, text: "Truly the most thoughtful and caring pharmacy I've ever dealt with. I appreciate Heidi and her team so much. They always go above and beyond, and treat their customers like family. You'll be in great hands with this pharmacy!", author: "Anna Romkey" },
    { rating: 5, text: "Village Pharmacy provides the best service and advise over any other pharmacy in town. My husband and I have gone here for our pharmaceutical needs for years. Heidi and Anoosh are extremely kind, knowledgeable and helpful. We would give them a 10 star rating if possible.", author: "Sharon Kreuzer" },
    { rating: 5, text: "Best Pharmacy in the city hands down!! I've been going here for 30 years now and Heidi & her husband are so warm welcoming and very knowledgeable not to mention EXTREMELY accommodating by delivering my daily medication all across the city for me. Highly recommend!!", author: "Sherilee Donison" },
    { rating: 5, text: "This pharmacy team is absolutely fantastic, so kind and knowledgeable. Real concern for their patients health and well-being. Recommended 10/10 ✨❤️ They patiently listen to you and often exceed expectations with their knowledge and advice. Simply the best.", author: "April Lavergne" },
    { rating: 5, text: "This is a very caring and friendly place to have as a pharmacy. I have dealt with them for about five years and never once had a problem. They are always more than willing to help with information and when they gave me my flu and covid shots I didn't even feel them!", author: "K Webster" },
    { rating: 5, text: "Heidi and her team are fantastic! They treat you like family with their care and service. I recommend this pharmacy to all of my family, friends, and clients.", author: "Craig Stretch" },
];

const GoogleLogo = () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export function ReviewsCarousel() {
    const [currentReview, setCurrentReview] = useState(0);
    const nextReview = useCallback(() => setCurrentReview((prev) => (prev + 1) % reviews.length), []);

    useEffect(() => {
        const timer = setInterval(nextReview, 7000);
        return () => clearInterval(timer);
    }, [nextReview]);

    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-2.5 mb-4">
                        <GoogleLogo />
                        <span className="text-lg font-semibold text-foreground font-sans">Google Reviews</span>
                    </div>
                    <div className="flex items-center justify-center gap-2.5 mb-2">
                        <span className="text-5xl font-serif text-foreground">4.9</span>
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5 fill-[#FBBC05] text-[#FBBC05]" />))}
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Based on Google Reviews</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full border border-border hover:bg-muted" onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)} aria-label="Previous review">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="bg-card rounded-2xl border border-border/60 p-8 shadow-soft min-h-[180px] flex flex-col justify-center flex-1">
                            <AnimatePresence mode="wait">
                                <motion.div key={currentReview} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0 font-sans">
                                            {reviews[currentReview].author.charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-foreground text-sm font-sans">{reviews[currentReview].author}</p>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(reviews[currentReview].rating)].map((_, j) => (<Star key={j} className="h-3 w-3 fill-[#FBBC05] text-[#FBBC05]" />))}
                                            </div>
                                        </div>
                                        <GoogleLogo />
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">"{reviews[currentReview].text}"</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <Button variant="ghost" size="icon" className="flex-shrink-0 rounded-full border border-border hover:bg-muted" onClick={nextReview} aria-label="Next review">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex justify-center gap-2 mt-5">
                        {reviews.map((_, i) => (
                            <button key={i} onClick={() => setCurrentReview(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentReview ? "bg-primary w-8" : "bg-border w-1.5 hover:bg-muted-foreground/40"}`} aria-label={`Go to review ${i + 1}`} />
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <a href="https://www.google.com/maps/search/?api=1&query=Village+IDA+Pharmacy+Edmonton" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                            See all reviews on Google <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
