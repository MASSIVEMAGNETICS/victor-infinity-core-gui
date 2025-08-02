import React from 'react';
import { Tab } from '../types';
import { ChatIcon, CodeIcon, MusicIcon, SystemIcon } from '../constants';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabOptions = [
  { id: Tab.CHAT, icon: <ChatIcon /> },
  { id: Tab.MODULES, icon: <CodeIcon /> },
  { id: Tab.SYNTH, icon: <MusicIcon /> },
  { id: Tab.SYSTEM, icon: <SystemIcon /> },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex-shrink-0 bg-godcore-darker border-b border-godcore-light">
      <nav className="flex space-x-2 px-4">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 focus:outline-none ${
              activeTab === tab.id
                ? 'bg-godcore-light text-godcore-accent border-b-2 border-godcore-accent'
                : 'text-godcore-text-secondary hover:text-godcore-text hover:bg-godcore-light/50'
            }`}
          >
            {tab.icon}
            {tab.id}
          </button>
        ))}
      </nav>
    </div>
  );
};
