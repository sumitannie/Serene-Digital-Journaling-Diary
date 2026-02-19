import { motion } from "framer-motion";
import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 flex items-center justify-between"
      >
        {/* FIX 1: Removed the <a> tag, moved className to Link */}
        <Link href="/" className="group no-underline">
            <div className="flex items-baseline gap-2">
              <h1 className="text-4xl sm:text-5xl font-serif text-foreground font-medium tracking-tight group-hover:text-primary transition-colors duration-300">
                Serene
              </h1>
              <span className="text-2xl opacity-40">📔</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 opacity-70 group-hover:opacity-100 transition-opacity tracking-widest uppercase font-medium">
              Your digital sanctuary
            </p>
        </Link>
        
        {/* FIX 2: Removed the <a> tag here too */}
        <Link href="/new" className="inline-flex items-center justify-center rounded-full w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md no-underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </Link>
      </motion.header>

      <main className="relative">
        {children}
      </main>
      
      <footer className="mt-32 pt-8 border-t border-border/30 text-center text-xs text-muted-foreground/50 opacity-60">
        <p>© {new Date().getFullYear()} Your thoughts, secured locally.</p>
      </footer>
    </div>
  );
}