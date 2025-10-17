import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Toaster } from "sonner";
import EasterEgg from "@/components/easter-egg";
import SupportDrawer from "@/components/support-drawer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Certiswift - Accelerate Your Learning",
  description: "Discover free and premium courses from industry leaders",
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider defaultTheme="light" storageKey="certiswift-theme">
          {/* Navigation */}
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
              <div className="flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                  <img 
                    src="https://i.ibb.co/4Rw4VxJf/Whats-App-Image-2025-10-12-at-19-10-41-4c008bfd.jpg" 
                    alt="Certiswift Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-bold">Certiswift</span>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link 
                            href="/"
                            className={cn(
                              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            )}
                          >
                            Home
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link 
                            href="/courses"
                            className={cn(
                              "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                            )}
                          >
                            Courses
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <SupportDrawer />
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>Info</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem asChild>
                          <Link href="/info">About Certiswift</Link>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem asChild>
                          <Link href="/privacy">Privacy Policy</Link>
                        </MenubarItem>
                        <MenubarItem asChild>
                          <Link href="/terms">Terms of Service</Link>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                  
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>
          
          {children}
          <Toaster />
          <EasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
