import { useState } from 'react';
import type { DropdownItem } from '../content/turboai';

interface MobileDropdownProps {
  label: string;
  items: DropdownItem[];
  onItemClick: () => void;
}

export function MobileDropdown({ label, items, onItemClick }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick();
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="mobile-nav-link w-full flex items-center justify-between"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${label} menu`}
      >
        <span>{label}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="pl-4 py-2 bg-charcoalDeep/50">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="block py-2 px-4 text-sm text-white/80 hover:text-white transition-colors duration-200"
              onClick={handleItemClick}
              aria-label={item.external ? `Visit ${item.label} (opens in new tab)` : `Navigate to ${item.label}`}
            >
              <div className="flex items-center justify-between">
                {item.label}
                {item.external && (
                  <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}