import { useState } from "react";
import { Smile, Type, Palette } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const FONT_FAMILIES = [
  // --- HANDWRITING & CASUAL ---
  { name: "Marker", value: "[font-family:'Caveat']", label: "Caveat (Marker)" },
  { name: "Neat Print", value: "[font-family:'Shadows_Into_Light']", label: "Shadows Into Light" },
  { name: "Messy Note", value: "[font-family:'Indie_Flower']", label: "Indie Flower" },
  { name: "School", value: "[font-family:'Patrick_Hand']", label: "Patrick Hand" },
  { name: "Sketch", value: "[font-family:'Amatic_SC']", label: "Amatic SC" },
  { name: "Ballpoint", value: "[font-family:'Kalam']", label: "Kalam" },
  
  // CURSIVE & ELEGANT ->
  { name: "Signature", value: "[font-family:'Great_Vibes']", label: "Great Vibes" },
  { name: "Brush", value: "[font-family:'Satisfy']", label: "Satisfy" },
  { name: "Vintage", value: "[font-family:'Dancing_Script']", label: "Dancing Script" },
  { name: "Retro", value: "[font-family:'Pacifico']", label: "Pacifico" },
  { name: "Calligraphy", value: "[font-family:'Zeyada']", label: "Zeyada" },
  { name: "Romantic", value: "[font-family:'Sacramento']", label: "Sacramento" },

  // CLEAN & MODERN ->
  { name: "Minimal", value: "font-sans", label: "DM Sans" },
  { name: "Rounded", value: "[font-family:'Quicksand']", label: "Quicksand" },
  { name: "Soft", value: "[font-family:'Comfortaa']", label: "Comfortaa" },
  { name: "Geometric", value: "[font-family:'Josefin_Sans']", label: "Josefin Sans" },
  { name: "Bold", value: "[font-family:'Montserrat']", label: "Montserrat" },
  
  // SERIF & CLASSIC ->
  { name: "Typewriter", value: "[font-family:'Courier_Prime']", label: "Courier Prime" },
  { name: "Book", value: "[font-family:'Merriweather']", label: "Merriweather" },
  { name: "Luxury", value: "[font-family:'Cormorant_Garamond']", label: "Cormorant" },
  { name: "Chunky", value: "[font-family:'Righteous']", label: "Righteous" },
];

const TEXT_COLORS = [
  { name: "Default", value: "text-foreground", hex: "#3a3a3a" },
  { name: "Slate", value: "text-slate-600", hex: "#475569" },
  { name: "Navy", value: "text-blue-700", hex: "#1d4ed8" }, // New
  { name: "Sky", value: "text-sky-500", hex: "#0ea5e9" }, // New
  { name: "Teal", value: "text-teal-600", hex: "#0d9488" }, // New
  { name: "Emerald", value: "text-emerald-600", hex: "#059669" }, // New
  { name: "Olive", value: "text-lime-700", hex: "#4d7c0f" }, // New
  { name: "Brown", value: "text-amber-800", hex: "#92400e" },
  { name: "Orange", value: "text-orange-600", hex: "#ea580c" }, // New
  { name: "Red", value: "text-red-600", hex: "#dc2626" }, // New
  { name: "Pink", value: "text-pink-500", hex: "#ec4899" }, // New
  { name: "Berry", value: "text-rose-700", hex: "#be123c" }, // New
  { name: "Lavender", value: "text-purple-600", hex: "#9333ea" },
  { name: "Violet", value: "text-violet-700", hex: "#6d28d9" },
];

const EMOJIS = [
  "😊", "🥰", "😍", "🤔", "😌", "😔", "😤", "🤫", "😴", "🎉", 
  "✨", "🌸", "🍃", "☀️", "🌙", "⭐", "💫", "🔥", "💔", "💚",
];

interface EditorToolbarProps {
  mood: string;
  onMoodChange: (emoji: string) => void;
  fontFamily: string;
  onFontChange: (font: string) => void;
  textColor: string;
  onColorChange: (color: string) => void;
}

export function EditorToolbar({
  mood,
  onMoodChange,
  fontFamily,
  onFontChange,
  textColor,
  onColorChange,
}: EditorToolbarProps) {
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/50 mb-6 sticky top-4 z-40 backdrop-blur-sm select-none">
      <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-semibold mr-1">Mood</span>
      
      {/* MOOD PICKER */}
      <Popover open={showMoodPicker} onOpenChange={setShowMoodPicker}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-sm font-medium no-underline"
            data-testid="button-mood-picker"
          >
            <Smile size={18} className="text-muted-foreground" />
            <span className="text-xl">{mood}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3" align="start">
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  onMoodChange(emoji);
                  setShowMoodPicker(false);
                }}
                className={`h-10 text-2xl rounded-lg hover:bg-primary/20 transition-colors ${
                  mood === emoji ? "bg-primary/30 ring-2 ring-primary" : ""
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="h-6 w-px bg-border/50 mx-1" />

      {/* FONT SELECTOR */}
      <div className="relative group">
        <select
          value={fontFamily}
          onChange={(e) => onFontChange(e.target.value)}
          className="pl-9 pr-8 py-2 rounded-lg bg-background border border-border/50 text-sm font-medium cursor-pointer hover:bg-muted transition-colors appearance-none min-w-[140px] focus:ring-2 focus:ring-primary/20 outline-none"
          data-testid="select-font"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
        <Type size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-hover:text-primary transition-colors" />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground opacity-50">
            <path d="M1 1L5 5L9 1" />
          </svg>
        </div>
      </div>

      {/* COLOR PICKER */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-background border border-border/50 hover:bg-muted transition-colors text-sm font-medium group"
            data-testid="button-color-picker"
          >
            <Palette size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span>Color</span>
            <div 
              className="w-3 h-3 rounded-full border border-black/10" 
              style={{ backgroundColor: TEXT_COLORS.find(c => c.value === textColor)?.hex || '#3a3a3a' }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="start">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Select Color</p>
            <div className="grid grid-cols-4 gap-3">
              {TEXT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => onColorChange(color.value)}
                  className={`group relative h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                    textColor === color.value
                      ? "ring-2 ring-primary ring-offset-2 scale-110"
                      : "hover:scale-110 ring-1 ring-border"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {textColor === color.value && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}