'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Compass, Search, MapPin, User, LogOut, ShieldCheck, Heart, Menu, X, Sparkles, Shield } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isAdmin = (session?.user as any)?.role === 'admin';

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Contact', href: '/contact' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest-100/80 bg-[#fbf8f3]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-forest-700 via-forest-600 to-terracotta-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-forest-900 group-hover:text-terracotta-600 transition-colors">
                Travel<span className="text-terracotta-500">Paglu</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-forest-600 -mt-1">
                Real Diaries • Real Costs
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination (e.g. Manali, Banaras) or budget (₹3000)..."
                className="w-full pl-10 pr-10 py-2 text-sm bg-white/90 border border-forest-200 rounded-full focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all shadow-sm placeholder:text-forest-400"
              />
              <Search className="w-4 h-4 text-forest-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-100 text-forest-800 font-semibold shadow-xs'
                      : 'text-forest-700 hover:text-forest-950 hover:bg-forest-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Always-visible Admin Portal Link */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                pathname.startsWith('/admin')
                  ? 'bg-terracotta-600 text-white shadow-sm'
                  : isAdmin
                  ? 'bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100 border border-terracotta-200'
                  : 'bg-stone-100 text-stone-700 hover:bg-terracotta-50 hover:text-terracotta-700 border border-stone-200'
              }`}
              title="Creator Admin CMS Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta-600" />
              <span>Admin Panel</span>
              {isAdmin && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </Link>
          </nav>

          {/* Right Action / User Area */}
          <div className="flex items-center gap-2.5">
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-forest-200 bg-white hover:bg-forest-50 transition shadow-sm text-forest-800"
                >
                  <div className="w-7 h-7 rounded-full bg-forest-600 text-white text-xs font-bold flex items-center justify-center">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
                    {session.user.name?.split(' ')[0]}
                  </span>
                  {isAdmin && (
                    <span className="bg-terracotta-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                      Admin
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-forest-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-forest-100">
                        <p className="text-xs font-semibold text-forest-900 truncate">{session.user.name}</p>
                        <p className="text-[11px] text-forest-500 truncate">{session.user.email}</p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-forest-700 hover:bg-forest-50"
                      >
                        <User className="w-3.5 h-3.5" />
                        My Profile & Wishlist
                      </Link>

                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-terracotta-700 hover:bg-terracotta-50 font-semibold border-t border-forest-50"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-terracotta-600" />
                        <span>Admin CMS Panel</span>
                      </Link>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 border-t border-forest-50 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs sm:text-sm font-semibold text-forest-700 hover:text-forest-900 px-3 py-2 rounded-lg hover:bg-forest-50 transition"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="text-xs sm:text-sm font-semibold bg-forest-700 hover:bg-forest-800 text-white px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-forest-700 hover:bg-forest-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-forest-100 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-forest-200 rounded-full"
              />
              <Search className="w-4 h-4 text-forest-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-forest-800 hover:bg-forest-50"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-terracotta-700 bg-terracotta-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin CMS Panel</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
