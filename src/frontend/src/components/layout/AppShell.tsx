import { type ReactNode } from 'react';
import { FloatingHeartsBackground } from '../effects/FloatingHeartsBackground';
import { AudioToggle } from '../controls/AudioToggle';
import { BackgroundMusicController } from '../audio/BackgroundMusicController';
import { Heart } from 'lucide-react';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="relative min-h-screen bg-valentine-gradient overflow-hidden">
            <FloatingHeartsBackground />
            <BackgroundMusicController />
            
            <div className="absolute top-4 right-4 z-50">
                <AudioToggle />
            </div>

            <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full max-w-2xl">
                    {children}
                </div>
            </main>

            <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground">
                <p className="flex items-center justify-center gap-2 flex-wrap">
                    © 2026. Built with <Heart className="w-4 h-4 text-valentine-red fill-valentine-red animate-heart-pulse" /> using{' '}
                    <a 
                        href="https://caffeine.ai" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors underline"
                    >
                        caffeine.ai
                    </a>
                </p>
            </footer>
        </div>
    );
}
