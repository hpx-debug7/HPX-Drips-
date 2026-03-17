import React from 'react';

export function TrustBar() {
  const items = [
    "FREE SHIPPING ABOVE ₹999",
    "EASY 15-DAY RETURNS",
    "100% AUTHENTIC DROPS",
    "MADE IN INDIA",
    "COD AVAILABLE",
    "NEW DROP EVERY FRIDAY",
  ];

  return (
    <div className="bg-brand-acid py-3 overflow-hidden w-full flex">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform text-black flex-shrink-0">
        {[...Array(3)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center">
            {items.map((item, index) => (
              <React.Fragment key={`${arrayIndex}-${index}`}>
                <span className="font-display font-black text-xs tracking-widest uppercase px-4 flex-shrink-0">
                  {item}
                </span>
                <span className="font-black px-2 flex-shrink-0">·</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
