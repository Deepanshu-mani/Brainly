import { AllIcon } from "./icons/AllIcon";
import { BrainIcon } from "./icons/BrainIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { CrossIcon } from "./icons/CrossIcon";

import { createContext, useContext } from 'react';

interface FilterContextType {
  filter: 'all' | 'twitter' | 'youtube';
  setFilter: (filter: 'all' | 'twitter' | 'youtube') => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function Sidebar({ 
  filter, 
  setFilter, 
  isOpen, 
  onClose 
}: { 
  filter: 'all' | 'twitter' | 'youtube'; 
  setFilter: (filter: 'all' | 'twitter' | 'youtube') => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white border-r-2 border-gray-200 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:border-b-0">
          <div className="flex gap-3 text-2xl lg:text-4xl items-center">
            <BrainIcon /> 
            <span className="font-bold">Brainly</span>
          </div>
          {/* Close button for mobile */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="pt-4">
          <SidebarItem 
            icon={<AllIcon />} 
            text="All"  
            active={filter === 'all'}
            onClick={() => {
              setFilter('all');
              onClose?.();
            }}
          />
          <SidebarItem 
            icon={<TwitterIcon />} 
            text="Twitter"  
            active={filter === 'twitter'}
            onClick={() => {
              setFilter('twitter');
              onClose?.();
            }}
          />
          <SidebarItem 
            icon={<YoutubeIcon />} 
            text="Youtube"  
            active={filter === 'youtube'}
            onClick={() => {
              setFilter('youtube');
              onClose?.();
            }}
          />
        </div>
      </div>
    </>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterContext.Provider');
  }
  return context;
}