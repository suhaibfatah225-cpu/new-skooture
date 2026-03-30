interface TranslatableInputProps {
  label: string;
  enValue: string;
  arValue: string;
  onEnChange: (value: string) => void;
  onArChange: (value: string) => void;
  multiline?: boolean;
}

export default function TranslatableInput({ 
  label, 
  enValue, 
  arValue, 
  onEnChange, 
  onArChange, 
  multiline = false 
}: TranslatableInputProps) {

  const inputClasses = "w-full px-5 py-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/5 focus:border-blue-500/50 dark:focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400";

  return (
    <div className="space-y-4">
      <label className="text-[11px] uppercase tracking-[0.2em] font-black text-zinc-400 dark:text-zinc-500 px-1">
        {label}
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-1">English Component</span>
          {multiline ? (
            <textarea 
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={`${inputClasses} min-h-[120px] resize-none`}
              placeholder="English text..."
            />
          ) : (
            <input 
              type="text"
              value={enValue}
              onChange={(e) => onEnChange(e.target.value)}
              className={inputClasses}
              placeholder="English text..."
            />
          )}
        </div>

        <div className="space-y-2" dir="rtl">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-1 block">النص العربي</span>
          {multiline ? (
            <textarea 
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${inputClasses} min-h-[120px] resize-none text-right font-arabic`}
              placeholder="النص بالعربي..."
            />
          ) : (
            <input 
              type="text"
              value={arValue}
              onChange={(e) => onArChange(e.target.value)}
              className={`${inputClasses} text-right font-arabic`}
              placeholder="النص بالعربي..."
            />
          )}
        </div>
      </div>
    </div>
  );
}
