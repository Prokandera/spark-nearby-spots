
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BatteryCharging, Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleSignup = () => {
    navigate('/signup');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const NavLinks = () => (
    <>
      <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
        Home
      </Link>
      <Link to="/map" className="text-foreground/80 hover:text-foreground transition-colors">
        Find Stations
      </Link>
      <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
        About
      </Link>
      <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
        Contact
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BatteryCharging className="h-6 w-6 text-ev-blue" />
          <span className="font-bold text-xl">EV Finder</span>
        </Link>

        {/* Desktop navigation */}
        {!isMobile && (
          <nav className="mx-6 flex items-center space-x-6 text-sm font-medium">
            <NavLinks />
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center space-x-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="hidden sm:inline-flex"
                onClick={handleLogout}
              >
                <LogOut className="mr-1.5 h-4 w-4" />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden sm:inline-flex" 
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button 
                className="bg-ev-blue hover:bg-ev-blue/90 hidden sm:inline-flex"
                onClick={handleSignup}
              >
                Sign Up
              </Button>
            </>
          )}
          
          {/* Mobile menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-6 mt-8 text-base font-medium">
                  <NavLinks />
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 py-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{user?.name}</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={handleLogin}
                      >
                        Login
                      </Button>
                      <Button 
                        className="w-full bg-ev-blue hover:bg-ev-blue/90"
                        onClick={handleSignup}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
