import React from 'react';

const Header = () => {
  return (
    <div className="sticky top-0 z-40 h-12 w-full bg-slate-900/80 text-white backdrop-blur transition-colors duration-500">
      <div className="max-w-8xl flex h-full items-center px-8">
        <div className="mr-4 flex-none">🌰</div>
        <div className="mr-4 flex-none">组件示例</div>
      </div>
    </div>
  );
};

export default Header;
