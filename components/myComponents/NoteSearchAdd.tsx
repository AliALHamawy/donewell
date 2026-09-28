"use client";

import { Plus, Search } from 'lucide-react';

interface NoteSearchAddProps {
  onOpenForm: () => void;
}
const NoteSearchAdd = ({ onOpenForm }: NoteSearchAddProps) => {
  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 pl-9" placeholder="Search notes" aria-label="Search notes" />
      </div>
      <button
        onClick={onOpenForm}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 py-2 h-11 shrink-0 px-5">
        <Plus className="size-4" />
        <span className="hidden sm:inline">New note</span>
      </button>
    </div>
  )
}

export default NoteSearchAdd