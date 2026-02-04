// Village IDA Logo component matching their actual branding
// Blue background with red-outlined white "I.D.A." letters

export function VillageIdaLogo({ 
  className = "", 
  size = "default" 
}: { 
  className?: string; 
  size?: "small" | "default" | "large" 
}) {
  const sizes = {
    small: { width: 120, fontSize: { village: 8, ida: 24, pharmacy: 7 } },
    default: { width: 180, fontSize: { village: 12, ida: 36, pharmacy: 10 } },
    large: { width: 280, fontSize: { village: 16, ida: 56, pharmacy: 14 } },
  };

  const s = sizes[size];

  return (
    <div 
      className={`flex flex-col items-center justify-center bg-primary rounded-lg p-3 ${className}`}
      style={{ width: s.width }}
    >
      <span 
        className="text-white font-bold tracking-widest uppercase"
        style={{ fontSize: s.fontSize.village }}
      >
        Village
      </span>
      <span 
        className="font-black tracking-wide"
        style={{ 
          fontSize: s.fontSize.ida,
          color: 'white',
          textShadow: '2px 0 0 hsl(0 75% 50%), -2px 0 0 hsl(0 75% 50%), 0 2px 0 hsl(0 75% 50%), 0 -2px 0 hsl(0 75% 50%), 1px 1px 0 hsl(0 75% 50%), -1px -1px 0 hsl(0 75% 50%), 1px -1px 0 hsl(0 75% 50%), -1px 1px 0 hsl(0 75% 50%)',
          fontFamily: 'Arial Black, sans-serif',
          letterSpacing: '0.05em'
        }}
      >
        I.D.A.
      </span>
      <span 
        className="text-white font-bold tracking-[0.2em] uppercase"
        style={{ fontSize: s.fontSize.pharmacy }}
      >
        Pharmacy
      </span>
    </div>
  );
}

export function VillageIdaLogoInline({ 
  className = "",
  dark = false
}: { 
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span 
        className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-white/90' : 'text-primary'}`}
      >
        Village
      </span>
      <span 
        className="font-black text-2xl tracking-wide"
        style={{ 
          color: dark ? 'white' : 'hsl(215 85% 35%)',
          textShadow: dark 
            ? '1.5px 0 0 hsl(0 75% 50%), -1.5px 0 0 hsl(0 75% 50%), 0 1.5px 0 hsl(0 75% 50%), 0 -1.5px 0 hsl(0 75% 50%)'
            : '1.5px 0 0 hsl(0 75% 50%), -1.5px 0 0 hsl(0 75% 50%), 0 1.5px 0 hsl(0 75% 50%), 0 -1.5px 0 hsl(0 75% 50%)',
          fontFamily: 'Arial Black, sans-serif',
        }}
      >
        I.D.A.
      </span>
      <span 
        className={`text-[10px] font-bold tracking-[0.15em] uppercase ${dark ? 'text-white/90' : 'text-primary'}`}
      >
        Pharmacy
      </span>
    </div>
  );
}