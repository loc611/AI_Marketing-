import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Iphone from './pages/Iphone';
import Store from './pages/Store';
import Mac from './pages/Mac';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black font-sans text-white antialiased">
        
        {/* Navigation Bar — Tailwind Glassmorphism */}
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl backdrop-saturate-[180%]">
          <div className="mx-auto flex h-12 max-w-[1000px] items-center justify-between px-5">
            
            {/* Logo */}
            <NavLink to="/" className="text-xl font-bold tracking-tight text-white">
              Apple
            </NavLink>

            {/* Navigation Links */}
            <div className="hidden gap-9 md:flex">
              <NavLink 
                to="/store" 
                className={({ isActive }) => 
                  `text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                Store
              </NavLink>
              <NavLink 
                to="/mac" 
                className={({ isActive }) => 
                  `text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                Mac
              </NavLink>
              <a href="#" className="text-sm text-white/80 transition-colors duration-200 hover:text-white">iPad</a>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-sm transition-colors duration-200 ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`
                }
              >
                iPhone
              </NavLink>
              <a href="#" className="text-sm text-white/80 transition-colors duration-200 hover:text-white">Watch</a>
              <a href="#" className="text-sm text-white/80 transition-colors duration-200 hover:text-white">Support</a>
            </div>

            {/* Pill Buy Button */}
            <button className="rounded-full bg-white px-4 py-1 text-xs font-medium text-black transition-colors duration-200 hover:bg-gray-200">
              Mua
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main>
          <Routes>
            <Route path="/" element={<Iphone />} />
            <Route path="/store" element={<Store />} />
            <Route path="/mac" element={<Mac />} />
          </Routes>
        </main>

        {/* Footer — Tailwind */}
        <footer className="border-t border-white/10 bg-black px-[5vw] py-8 text-sm text-[#86868b]">
          <div className="mx-auto flex max-w-[1000px] flex-col gap-4">
            <div className="flex flex-wrap gap-5 border-b border-white/10 pb-4">
              <a href="#" className="text-[#86868b] no-underline transition-colors hover:text-white hover:underline">Chính sách Quyền riêng tư</a>
              <a href="#" className="text-[#86868b] no-underline transition-colors hover:text-white hover:underline">Điều khoản Sử dụng</a>
              <a href="#" className="text-[#86868b] no-underline transition-colors hover:text-white hover:underline">Bán hàng và Hoàn tiền</a>
              <a href="#" className="text-[#86868b] no-underline transition-colors hover:text-white hover:underline">Pháp lý</a>
              <a href="#" className="text-[#86868b] no-underline transition-colors hover:text-white hover:underline">Sơ đồ trang web</a>
            </div>
            <p className="mb-1">Bản quyền © 2026 Apple Inc. Bảo lưu mọi quyền.</p>
            <p className="text-xs">Website này được tạo ra cho mục đích demo thiết kế.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
