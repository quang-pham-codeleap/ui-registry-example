export default function getNameInitials(input?: string, fallback = 'NA'): string {
  if (!input) {
    return fallback;
  }
  // Split the name into words
  const words = input.trim().split(/\s+/);

  if (words.length === 0 || words[0] === '') {
    return fallback; // Handle empty string after trimming
  } else if (words.length === 1) {
    // If only one word, take the first two letters of that word
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // If two or more words, take the first letter of the first two words
    const firstInitial = words[0].substring(0, 1);
    const secondInitial = words[1].substring(0, 1);
    return (firstInitial + secondInitial).toUpperCase();
  }
}
