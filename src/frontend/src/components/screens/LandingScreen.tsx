import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Heart } from 'lucide-react';
import { CopyLinkButton } from '../controls/CopyLinkButton';
import { SpotifyEmbed } from '../spotify/SpotifyEmbed';

interface LandingScreenProps {
    onStart: () => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
    return (
        <div className="animate-fade-in">
            <Card className="bg-card-gradient backdrop-blur-sm border-2 border-valentine-pink/20 shadow-valentine-lg p-8 sm:p-12 rounded-3xl">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <div className="flex justify-center mb-6">
                            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-valentine-red fill-valentine-red animate-heart-pulse" />
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            How Well Do You Know Your Wife? 💖
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-muted-foreground">
                            A tiny test made with love just for you
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={onStart}
                            size="lg"
                            className="text-lg px-8 py-6 rounded-2xl bg-valentine-red hover:bg-valentine-red/90 text-white shadow-valentine transition-all hover:scale-105 hover:shadow-valentine-lg"
                        >
                            Start the Love Test <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>

                    <div className="pt-6">
                        <SpotifyEmbed />
                    </div>

                    <div className="pt-4">
                        <CopyLinkButton />
                    </div>
                </div>
            </Card>
        </div>
    );
}
