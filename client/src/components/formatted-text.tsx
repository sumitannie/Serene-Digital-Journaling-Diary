import { cn } from "@/lib/utils";

interface FormattedTextProps {
  content: string;
  className?: string;
}

export function FormattedText({ content, className = "" }: FormattedTextProps) {
  const formatText = (text: string) => {
    if (!text) return "";

    let formatted = text
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/<u>/g, '<u class="underline decoration-primary/50 underline-offset-4">')
      .replace(/<\/u>/g, "</u>");

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');

    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-foreground/80">$1</em>');

    formatted = formatted.replace(/\n/g, "<br />");

    return formatted;
  };

  return (
    <div
      className={cn("prose prose-stone dark:prose-invert max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: formatText(content) }}
    />
  );
}