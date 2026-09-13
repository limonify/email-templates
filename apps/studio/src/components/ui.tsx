import * as React from "react";
import { cn } from "@/lib/cn";

export function Button({
  variant = "ghost",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "danger";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" &&
          "bg-chrome-50 text-chrome-950 hover:bg-chrome-100",
        variant === "ghost" &&
          "text-chrome-300 hover:bg-chrome-800 hover:text-chrome-50",
        variant === "outline" &&
          "border border-chrome-600 bg-chrome-800 text-chrome-50 hover:border-chrome-400",
        variant === "danger" &&
          "border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20",
        className,
      )}
      {...props}
    />
  );
}

export function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: React.ReactNode; title?: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-md border border-chrome-600 bg-chrome-800 p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.title}
          onClick={() => onChange(option.value)}
          className={cn(
            "cursor-pointer rounded px-2.5 py-1 text-[11px] font-medium transition-colors",
            option.value === value
              ? "bg-chrome-600 text-white"
              : "text-chrome-300 hover:text-chrome-50",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "cursor-pointer rounded-md border border-chrome-600 bg-chrome-800 px-2.5 py-1.5 text-[11px] font-medium text-chrome-50 outline-none focus:border-chrome-400",
        className,
      )}
      {...props}
    />
  );
}

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-chrome-700 bg-chrome-850 px-2.5 py-1.5 text-xs text-chrome-50 outline-none placeholder:text-chrome-400 focus:border-chrome-400",
        className,
      )}
      {...props}
    />
  );
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={4}
      className={cn(
        "w-full resize-y rounded-md border border-chrome-700 bg-chrome-850 px-2.5 py-1.5 text-xs leading-5 text-chrome-50 outline-none placeholder:text-chrome-400 focus:border-chrome-400",
        className,
      )}
      {...props}
    />
  );
}

export function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors",
        checked ? "bg-accent" : "bg-chrome-600",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
          checked ? "translate-x-4.5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export function Field({
  label,
  help,
  children,
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-medium text-chrome-300">{label}</span>
      {children}
      {help ? (
        <span className="block text-[10px] leading-4 text-chrome-400">
          {help}
        </span>
      ) : null}
    </label>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-1 pt-4 pb-2 text-[10px] font-semibold tracking-[0.08em] text-chrome-400 uppercase">
      {children}
    </div>
  );
}
