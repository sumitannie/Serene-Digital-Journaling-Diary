import { Layout } from "@/components/layout";
import { EntryCard } from "@/components/entry-card";
import { useDiaryStore } from "@/lib/store";
import { getDailyQuote } from "@/lib/quotes";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { Search, Home as HomeIcon, BookOpen } from "lucide-react";

export default function Home() {
  const { entries, deleteEntry, isLoading } = useDiaryStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    if (entries.length > 0) {
      setViewMode('dashboard');
    }
  }, [entries.length === 0]); 

  const dailyQuote = useMemo(() => getDailyQuote(), []);

  const filteredEntries = entries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query) ||
      entry.mood.includes(query)
    );
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-48">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/40 text-sm tracking-widest uppercase font-medium"
          >
          </motion.div>
        </div>
      </Layout>
    );
  }

  const showLanding = entries.length === 0 || viewMode === 'landing';

  return (
    <Layout>
      {showLanding ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-24 px-6 rounded-3xl bg-gradient-to-br from-secondary/30 via-card to-accent/20 border border-dashed border-border/50"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6 opacity-60"
          >
            🍃
          </motion.div>
          
          <h2 className="text-3xl font-serif text-foreground mb-4 font-medium">What made you smile today?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            Every great story begins with a single entry. Jot down your thoughts, feelings, dreams, ideas or just what you had for lunch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/new" className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 no-underline">
              Write Your thoughts
            </Link>

            {entries.length > 0 && (
              <button 
                onClick={() => setViewMode('dashboard')}
                className="inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium text-primary hover:bg-primary/5 transition-all"
              >
                <BookOpen size={18} className="mr-2"/>
                View Journal ({entries.length})
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          
          <div className="flex justify-start">
            <button 
              onClick={() => setViewMode('landing')}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors pl-1"
            >
              <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/10 transition-colors">
                <HomeIcon size={18} />
              </div>
              Home
            </button>
          </div>
         
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/20 text-center"
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground/60 font-medium mb-3">Today's Thought</p>
            <p className="text-lg sm:text-xl font-serif text-foreground italic leading-relaxed">
              "{dailyQuote}"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 px-2"
          >
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-serif text-foreground font-medium">Your Memories</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {entries.length} {entries.length === 1 ? "entry" : "entries"} saved • Last entry {new Date(entries[0].date).toLocaleDateString()}
                </p>
              </div>
              <Link href="/new" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium no-underline">
                + New
              </Link>
            </div>

            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                placeholder="Search entries by title, content, or mood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                data-testid="input-search"
              />
            </div>
          </motion.div>
          
          <div className="grid gap-6">
            {filteredEntries.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <p className="text-sm">No entries match your search.</p>
              </motion.div>
            ) : (
              filteredEntries.map((entry, index) => (
                <EntryCard 
                  key={entry.id} 
                  entry={entry} 
                  index={index} 
                  onDelete={deleteEntry} 
                />
              ))
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}