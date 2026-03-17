import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'ghost' | 'outline' | 'acid-fill';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyle = "font-display font-black text-sm tracking-widest uppercase rounded-full transition-all duration-150 flex items-center justify-center";
  
  const styles = {
    'primary': "bg-brand-acid text-black px-8 py-4 hover:bg-brand-acid-dark active:scale-[0.98]",
    'ghost': "border border-white/40 text-white px-8 py-4 hover:bg-white hover:text-black",
    'outline': "border border-brand-acid text-brand-acid hover:bg-brand-acid hover:text-black px-5 py-2",
    'acid-fill': "bg-brand-acid text-black px-8 py-4 hover:bg-brand-acid-dark rounded-xl",
  };

  const classes = `${baseStyle} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
