export const DAILY_QUOTES = [
  "The only way out is through. — Robert Frost",
  "Be gentle with yourself. You're doing the best you can.",
  "Every moment is a fresh beginning. — Ralph Waldo Emerson",
  "You are braver than you believe, stronger than you seem, and smarter than you think. — A.A. Milne",
  "Bloom where you are planted. — Unknown",
  "Life is about accepting things as they are and finding peace within them.",
  "Your voice matters. Your story matters. You matter.",
  "The most beautiful things in life are often the simplest.",
  "Progress, not perfection.",
  "You are worthy exactly as you are.",
  "In the middle of difficulty lies opportunity. — Albert Einstein",
  "Kindness is a language the deaf can hear and the blind can see. — Mark Twain",
  "Today is a good day to be present.",
  "Take care of your mind, body, and spirit.",
  "You have survived 100% of your worst days.",
  "This too shall pass. — Persian Proverb",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Embrace what makes you different.",
  "Small steps lead to big changes.",
  "You are exactly where you need to be.",
  "Let it go. Life moves forward.",
  "Your future is bright with endless possibilities.",
  "Peace comes from within. Do not seek it without. — Buddha",
  "The present moment is all we truly have.",
  "You are stronger than your struggles.",
  "Creativity is intelligence having fun. — Albert Einstein",
  "Find joy in the simple things.",
  "You deserve rest, love, and happiness.",
  "Today, choose yourself.",
  "The only impossible journey is the one you never begin.",
];

export function getDailyQuote(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dayOfYear = Math.floor((new Date(year, month, date) - new Date(year, 0, 0)) / 86400000);
  const index = dayOfYear % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
}
