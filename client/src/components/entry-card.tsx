import { motion } from "framer-motion";
import { format } from "date-fns";
import { DiaryEntry } from "@/lib/store";
import { Link } from "wouter";
import { Trash2, Edit2, Image as ImageIcon } from "lucide-react";
import { FormattedText } from "./formatted-text";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EntryCardProps {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
  index: number;
}

export function EntryCard({ entry, onDelete, index }: EntryCardProps) {
  const fontClass = entry.fontFamily || "font-sans";
  const colorClass = entry.textColor || "text-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-gradient-to-br from-card to-card/95 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-border/40 hover:border-primary/30 mb-6 overflow-hidden"
      data-testid={`card-entry-${entry.id}`}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
        <Link href={`/edit/${entry.id}`}>
          <a className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all hover:scale-110 no-underline" title="Edit">
            <Edit2 size={16} />
          </a>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all hover:scale-110" title="Delete" data-testid={`button-delete-${entry.id}`}>
              <Trash2 size={16} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This entry will be permanently removed from your diary.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(entry.id)} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 text-sm font-medium relative z-10">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-full text-xs uppercase tracking-wider text-foreground/80 font-semibold">
            {format(new Date(entry.date), "MMM d, yyyy")}
          </span>
          <span className="text-xs text-muted-foreground/60">
            {format(new Date(entry.date), "h:mm a")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {entry.images && entry.images.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
              <ImageIcon size={14} />
              {entry.images.length}
            </span>
          )}
          {entry.mood && (
            <span className="text-lg" title="Mood">
              {entry.mood}
            </span>
          )}
        </div>
      </div>

      <Link href={`/edit/${entry.id}`}>
        <a className="block group-hover:cursor-pointer relative z-10 no-underline">
          <h2 className={`text-2xl font-serif font-medium ${colorClass} mb-3 leading-tight group-hover:text-primary transition-colors duration-200`}>
            {entry.title}
          </h2>
          <FormattedText
            content={entry.content}
            className={`text-muted-foreground ${fontClass} text-base leading-relaxed line-clamp-4 opacity-85 group-hover:opacity-95 transition-opacity prose prose-sm max-w-none [&_strong]:font-bold [&_em]:italic [&_u]:underline`}
          />
        </a>
      </Link>

      {entry.images && entry.images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {entry.images.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Entry image ${idx + 1}`}
              className="w-full h-20 object-cover rounded-lg border border-border/30"
            />
          ))}
          {entry.images.length > 3 && (
            <div className="w-full h-20 rounded-lg border border-border/30 bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
              +{entry.images.length - 3} more
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
