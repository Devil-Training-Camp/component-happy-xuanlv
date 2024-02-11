import React from 'react';
import { Outlet } from 'react-router-dom';
import { MacScrollbar } from 'mac-scrollbar';
import Header from '@/components/Header';
import Menu from '@/components/Menu';

function BasicLayout() {
  return (
    <>
      <Header />
      <div className="flex w-full">
        <MacScrollbar className="bordered sticky top-12 h-[calc(100vh_-_48px)] w-52 flex-none overflow-y-auto border-r border-slate-200">
          <Menu />
        </MacScrollbar>
        <div className="flex flex-1 flex-col overflow-x-hidden p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BasicLayout;
