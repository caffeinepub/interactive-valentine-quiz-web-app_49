import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, RotateCcw } from 'lucide-react';
import { CopyLinkButton } from '../controls/CopyLinkButton';
import { CelebrationLayer } from '../effects/CelebrationLayer';
import { SpotifyEmbed } from '../spotify/SpotifyEmbed';
import { useAudioController } from '../../hooks/useAudioController';

interface ValentineFlowScreenProps {
    onRestart: () => void;
}

export function ValentineFlowScreen({ onRestart }: ValentineFlowScreenProps) {
    const [noClickCount, setNoClickCount] = useState(0);
    const [showFinalCelebration, setShowFinalCelebration] = useState(false);
    const { playSound } = useAudioController();

    const handleNoClick = () => {
        playSound('select');
        setNoClickCount(prev => prev + 1);
    };

    const handleYesClick = () => {
        playSound('success');
        setShowFinalCelebration(true);
    };

    const getPromptText = () => {
        if (noClickCount === 0) return "will you still be my valentine? 💘";
        if (noClickCount === 1) return "are you sure?? 🥺";
        return "you have no escape 😌";
    };

    // Progressive sizing with mobile-safe bounds
    const getYesButtonSize = () => {
        const baseSize = 1;
        const growth = noClickCount * 0.5;
        return Math.min(baseSize + growth, 4); // Cap at 4x to fill most of screen
    };

    const getNoButtonSize = () => {
        const baseSize = 1;
        const shrink = noClickCount * 0.18;
        return Math.max(baseSize - shrink, 0.2); // Floor at 0.2x
    };

    const yesButtonScale = getYesButtonSize();
    const noButtonScale = getNoButtonSize();

    // Screen 2: Full-screen celebration after yes click
    if (showFinalCelebration) {
        return (
            <>
                <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-2xl text-center space-y-8 animate-scale-in">
                        <Heart className="w-24 h-24 mx-auto text-valentine-red fill-valentine-red animate-heart-pulse" />
                        
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground px-4">
                            YAY!!! you are my valentine forever 💖🌹
                        </h1>

                        <p className="text-xl sm:text-2xl text-muted-foreground px-4">
                            you may not be perfect, but you're mine 💖
                        </p>

                        <div className="py-6">
                            <img 
                                src="/assets/generated/valentine-meme-perfect.dim_1200x900.png"
                                alt="Happy celebration"
                                className="w-full max-w-md mx-auto rounded-2xl shadow-valentine"
                            />
                        </div>

                        <div className="pt-4">
                            <SpotifyEmbed />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                            <CopyLinkButton />
                            <Button
                                onClick={onRestart}
                                variant="outline"
                                className="rounded-2xl border-2"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Take Again
                            </Button>
                        </div>
                    </div>
                </div>
                <CelebrationLayer type="valentine" />
            </>
        );
    }

    // Screen 1: Valentine prompt with yes/no button interaction
    return (
        <div className="animate-scale-in">
            <Card className="bg-card-gradient backdrop-blur-sm border-2 border-valentine-pink/20 shadow-valentine-lg p-6 sm:p-8 rounded-3xl">
                <div className="text-center space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-foreground transition-all duration-500 ease-playful px-4">
                        {getPromptText()}
                    </h2>

                    <div className="relative min-h-[250px] flex items-center justify-center overflow-hidden px-4">
                        <div className="flex items-center justify-center gap-4 flex-wrap max-w-full">
                            <Button
                                onClick={handleYesClick}
                                size="lg"
                                className="rounded-2xl bg-valentine-red hover:bg-valentine-red/90 text-white shadow-valentine hover:shadow-valentine-lg whitespace-nowrap"
                                style={{
                                    transform: `scale(${yesButtonScale})`,
                                    transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    transformOrigin: 'center'
                                }}
                            >
                                yes 💖
                            </Button>

                            <Button
                                onClick={handleNoClick}
                                variant="outline"
                                size="lg"
                                className="rounded-2xl border-2 whitespace-nowrap"
                                style={{
                                    transform: `scale(${noButtonScale})`,
                                    transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    opacity: noButtonScale < 0.4 ? 0.6 : 1,
                                    transformOrigin: 'center'
                                }}
                            >
                                no 😈
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <CopyLinkButton />
                        <Button
                            onClick={onRestart}
                            variant="ghost"
                            className="rounded-2xl"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Retake Quiz
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
