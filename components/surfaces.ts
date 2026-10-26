// Kept out of the "use client" little-guy module: a plain string exported from a client module reaches
// server components as a client reference, not the string, and the card loses its surface.
export const littleGuySurface = "bg-bg shadow-media ring-1 ring-line";
