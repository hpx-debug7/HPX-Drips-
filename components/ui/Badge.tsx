import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'acid' | 'dark' | 'outline';
}

export function Badge({ children, className = '', variant = 'acid' }: BadgeProps) {
  const baseStyle = "font-display font-black text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-md inline-block whitespace-nowrap";
  const styles = {
    acid: "bg-brand-acid text-black",
    dark: "bg-brand-acid/10 text-brand-acid",
    outline: "border border-zinc-700 text-zinc-500 tracking-wider",
  };
  
  return (
    <span className={`${baseStyle} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
