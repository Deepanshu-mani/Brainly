import { AllIcon } from "./icons/AllIcon";
import { BrainIcon } from "./icons/BrainIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

import { createContext, useContext } from 'react';

interface FilterContextType {
  filter: 'all' | 'twitter' | 'youtube';
  setFilter: (filter: 'all' | 'twitter' | 'youtube') => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function Sidebar({ filter, setFilter }: { filter: 'all' | 'twitter' | 'youtube'; setFilter: (filter: 'all' | 'twitter' | 'youtube') => void }) {
  return (
    <div className="h-screen bg-white border-r-2 w-64 fixed left-0 border-gray-200 top-0">
      <div className="ml-4 flex gap-3 text-4xl pt-4 mb-4">
        <BrainIcon /> 
        Brainly
      </div>
      <SidebarItem 
        icon={<AllIcon />} 
        text="All"  
        active={filter === 'all'}
        onClick={() => setFilter('all')}
      />
      <SidebarItem 
        icon={<TwitterIcon />} 
        text="Twitter"  
        active={filter === 'twitter'}
        onClick={() => setFilter('twitter')}
      />
      <SidebarItem 
        icon={<YoutubeIcon />} 
        text="Youtube"  
        active={filter === 'youtube'}
        onClick={() => setFilter('youtube')}
      />
    </div>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterContext.Provider');
  }
  return context;
}