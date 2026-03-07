"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, FileText, ArrowRightLeft, Star } from "lucide-react";

export function HomeHero() {
    return (
        <>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg">
                Skip to main content
            </a>

            <section id="main-content" className="relative min-h-[85vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/_DSC3861.jpg" alt="" className="w-full h-full object-cover" loading="eager" />
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
                </div>
                <div className="container mx-auto px-4 relative z-10 py-20">
                    <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                        <motion.p className="text-primary-foreground/60 text-sm font-semibold uppercase tracking-[0.2em] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            Edmonton's Independent Pharmacy
                        </motion.p>
                        <h1 className="text-display-sm md:text-5xl lg:text-6xl text-background leading-[1.05] mb-6 font-serif">
                            Switch in minutes, get personal care without the <span className="italic relative">chain pharmacy hassle.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-background/70 mb-10 leading-relaxed max-w-lg">
                            Local Edmonton pharmacy with free city-wide delivery, fast refills, and pharmacists who actually know your case.
                        </p>
                        <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <Button asChild size="lg" className="rounded-full px-8 gap-2 shadow-lift">
                                <Link href="/transfer">Transfer My Prescriptions <ArrowRight className="h-4 w-4" /></Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background">
                                <Link href="/refill">Request a Refill</Link>
                            </Button>
                        </motion.div>
                        <motion.div className="flex flex-wrap gap-3 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                            <span className="inline-flex items-center gap-1.5 text-sm text-background/90 bg-background/10 backdrop-blur-sm rounded-full px-4 py-1.5 font-medium">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> 4.9 Google Rating
                            </span>
                            {["Free delivery", "Walk-in flu shots", "Local independent pharmacy"].map((item) => (
                                <span key={item} className="inline-flex items-center gap-2 text-sm text-background/80 bg-background/10 backdrop-blur-sm rounded-full px-4 py-1.5">
                                    <CheckCircle className="h-3.5 w-3.5 text-success/80" />{item}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
