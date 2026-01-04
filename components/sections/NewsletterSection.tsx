"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("Successfully subscribed!", "You'll receive travel updates and exclusive offers.");
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary-deep">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/50 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Icon Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-8"
          >
            <Mail className="h-10 w-10 text-white" />
          </motion.div>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-white">Newsletter</span>
          </motion.div>
          
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-serif"
          >
            Stay Updated with{" "}
            <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
              Travel Tips
            </span>
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed"
          >
            Subscribe to our newsletter and get exclusive travel guides, destination highlights, 
            and special offers delivered to your inbox.
          </motion.p>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50",
                    "focus:bg-white/10 focus:border-white/30 focus:ring-2 focus:ring-accent/50",
                    "transition-all duration-300 h-14 text-base"
                  )}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className={cn(
                    "h-14 px-8 bg-accent hover:bg-accent-hover text-foreground font-semibold",
                    "shadow-lg hover:shadow-xl transition-all duration-300",
                    "group disabled:opacity-50 disabled:cursor-not-allowed",
                    isSubscribed && "bg-success hover:bg-success"
                  )}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Mail className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm text-white/70 flex items-center justify-center gap-2"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent"></span>
                We respect your privacy. Unsubscribe at any time.
              </motion.p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

