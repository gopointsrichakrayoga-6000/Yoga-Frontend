import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none select-none';

  const variants = {
    primary: 'bg-royal-900 text-white hover:bg-royal-800 shadow-md hover:shadow-lg border border-royal-800/60',
    gold: 'bg-gold-500 text-royal-950 hover:bg-gold-400 font-semibold shadow-sm hover:shadow-md',
    outline: 'bg-white text-royal-900 border-2 border-royal-900 hover:bg-royal-900 hover:text-white shadow-sm',
    outlineLight: 'bg-transparent text-cream-50 border border-cream-100/35 hover:bg-cream-50/10 hover:border-gold-400',
    ghost: 'bg-transparent text-royal-900 hover:bg-royal-800/10',
    custom: '',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs space-x-1.5',
    md: 'px-5 py-2.5 text-sm space-x-2',
    lg: 'px-7 py-3.5 text-base space-x-2.5',
  };

  // If variant is defaulted to primary but className explicitly passes background or border overrides, use custom base
  const appliedVariant = (variant === 'primary' && (className.includes('bg-') || (className.includes('border') && className.includes('text-')))) ? '' : variants[variant];
  const classes = `${baseStyles} ${appliedVariant} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {Icon && <Icon className="w-4 h-4 text-gold-500 shrink-0" />}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {Icon && <Icon className="w-4 h-4 text-gold-500 shrink-0" />}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {Icon && <Icon className="w-4 h-4 text-gold-500 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};
