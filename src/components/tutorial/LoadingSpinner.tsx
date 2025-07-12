import React from 'react';
import { ChefHat } from 'lucide-react';

const TutorialLoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[#FF6B6B]/20 border-t-[#FF6B6B] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ChefHat className="w-6 h-6 text-[#FF6B6B]" />
        </div>
      </div>
      <p className="mt-6 text-lg text-[#1e293b] font-medium">Preparing your cooking guide...</p>
      <p className="text-sm text-gray-500 mt-2">Loading detailed instructions and resources</p>
    </div>
  );
};

export default TutorialLoadingSpinner;
