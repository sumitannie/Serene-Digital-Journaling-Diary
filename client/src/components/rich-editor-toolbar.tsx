import { useRef } from "react";
import { Smile, Mic, Image, Bold, Italic, Underline } from "lucide-react";
import { useVoiceInput, fileToBase64 } from "@/lib/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const EMOJIS = [
  "😊", "🥰", "😍", "🤔", "😌", "😔", "😤", "🤫", "😴", "🎉",
  "✨", "🌸", "🍃", "☀️", "🌙", "⭐", "💫", "🔥", "💔", "💚",
  "🎨", "🎭", "🎪", "🎸", "🎬", "📚", "📝", "💎", "🌺", "🦋",
];

interface RichEditorToolbarProps {
  onImageAdd: (imageData: string) => void;
}

export function RichEditorToolbar({
  onImageAdd,
}: RichEditorToolbarProps) {
  const { isListening, startListening, stopListening } = useVoiceInput();
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Helper to run browser commands (Bold, Italic, etc.)
  const runCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    // Keep focus in the editor
    const editor = document.getElementById("visual-editor");
    editor?.focus();
  };

  const insertEmoji = (emoji: string) => {
    runCommand("insertText", emoji);
  };

  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => {
        runCommand("insertText", text + " ");
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid File", description: "Please select an image file.", variant: "destructive" });
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      onImageAdd(base64);
      toast({ title: "Image Added", description: "Your image has been added." });
    } catch (error) {
      toast({ title: "Upload Failed", description: "Could not upload the image.", variant: "destructive" });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-secondary/30 rounded-2xl border border-border/50 mb-6 sticky top-4 z-40 backdrop-blur-sm select-none">
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/50 hover:bg-accent transition-colors text-sm font-medium">
            <Smile size={16} />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="start">
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map((emoji) => (
              <button key={emoji} onClick={() => insertEmoji(emoji)} className="h-10 text-xl rounded-lg hover:bg-primary/20 transition-colors">
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* VISUAL COMMAND BUTTONS */}
      <button onClick={() => runCommand("bold")} className="p-2 rounded-lg hover:bg-muted text-foreground" title="Bold (Ctrl+B)">
        <Bold size={16} />
      </button>

      <button onClick={() => runCommand("italic")} className="p-2 rounded-lg hover:bg-muted text-foreground" title="Italic (Ctrl+I)">
        <Italic size={16} />
      </button>

      <button onClick={() => runCommand("underline")} className="p-2 rounded-lg hover:bg-muted text-foreground" title="Underline (Ctrl+U)">
        <Underline size={16} />
      </button>
      
      <button onClick={() => imageInputRef.current?.click()} className="p-2 rounded-lg hover:bg-muted text-foreground" title="Add Image">
        <Image size={16} />
      </button>
      <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      <button onClick={handleVoiceClick} className={`p-2 rounded-lg transition-colors ${isListening ? "bg-destructive/20 text-destructive animate-pulse" : "hover:bg-muted text-foreground"}`} title="Voice">
        <Mic size={16} />
      </button>
    </div>
  );
}