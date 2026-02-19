import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { EditorToolbar } from "@/components/editor-toolbar";
import { RichEditorToolbar } from "@/components/rich-editor-toolbar";
import { useDiaryStore } from "@/lib/store";
import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Save, X } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Editor() {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/edit/:id");
  const { addEntry, getEntry, updateEntry } = useDiaryStore();
  const { toast } = useToast();
  
  // This ref controls the new Visual Editor div
  const editorRef = useRef<HTMLDivElement>(null);
  
  const isEditing = match && params?.id;
  const existingEntry = isEditing ? getEntry(params.id!) : null;

  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("🌸");
  const [fontFamily, setFontFamily] = useState("font-sans");
  const [textColor, setTextColor] = useState("text-foreground");
  const [images, setImages] = useState<string[]>([]);
  
  // Load existing data
  useEffect(() => {
    if (existingEntry) {
      setTitle(existingEntry.title);
      setMood(existingEntry.mood);
      setFontFamily(existingEntry.fontFamily || "font-sans");
      setTextColor(existingEntry.textColor || "text-foreground");
      setImages(existingEntry.images || []);
      
      // Load content into the visual editor safely
      if (editorRef.current) {
        editorRef.current.innerHTML = existingEntry.content;
      }
    }
  }, [existingEntry]);

  const handleSave = () => {
    // Get the HTML content from the visual editor
    const content = editorRef.current?.innerHTML || "";

    if (!title.trim() && !content.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
        variant: "destructive"
      });
      return;
    }

    const finalTitle = title.trim() || "Untitled Entry";
    const entryData = { 
      title: finalTitle, 
      content, // Saves the HTML with bold tags automatically
      mood,
      fontFamily,
      textColor,
      images
    };

    if (isEditing && params?.id) {
      updateEntry(params.id, entryData);
      toast({ title: "Updated", description: "Your memory has been updated." });
    } else {
      addEntry(entryData);
      toast({ title: "Saved", description: "Your memory has been saved." });
    }
    
    setLocation("/");
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors no-underline">
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Link>
          <span className="text-xs uppercase tracking-widest text-muted-foreground/50 font-medium">
            {isEditing ? "Editing Entry" : "New Entry"}
          </span>
        </div>

        <div className="bg-card rounded-3xl shadow-lg border border-border/50 p-6 sm:p-12 relative overflow-hidden">
          <div className="space-y-8 relative z-10">
            <EditorToolbar
              mood={mood}
              onMoodChange={setMood}
              fontFamily={fontFamily}
              onFontChange={setFontFamily}
              textColor={textColor}
              onColorChange={setTextColor}
            />

            {/* We pass nothing to the toolbar now, it works globally */}
            <RichEditorToolbar onImageAdd={(imgData) => setImages([...images, imgData])} />

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your day..."
              className={`w-full bg-transparent border-none text-4xl sm:text-5xl font-serif ${textColor} placeholder:text-muted-foreground/30 focus:ring-0 p-0 font-medium`}
              autoFocus={!isEditing}
            />

            {/* --- THIS IS THE NEW VISUAL EDITOR --- */}
            <div
              id="visual-editor"
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className={`w-full min-h-[500px] bg-transparent border-none text-lg leading-relaxed ${fontFamily} ${textColor} outline-none empty:before:content-[attr(placeholder)] empty:before:text-muted-foreground/30`}
              placeholder="What's on your mind?..."
            />
            {/* -------------------------------------- */}

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <motion.div key={idx} className="relative group">
                    <img src={img} alt={`Entry image ${idx + 1}`} className="w-full h-40 object-cover rounded-xl border border-border/50" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-destructive/80 text-white p-1 rounded-full transition-all"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end pt-8 border-t border-border/30">
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-all"
              >
                <Save size={18} className="mr-2" />
                Save Memory
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}