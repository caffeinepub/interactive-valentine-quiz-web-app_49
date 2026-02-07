import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, RotateCcw } from 'lucide-react';
import { CopyLinkButton } from '../controls/CopyLinkButton';
import { useAudioController } from '../../hooks/useAudioController';

interface ResultsPerfectScreenProps {
    onRestart: () => void;
    onContinue: () => void;
}

export function ResultsPerfectScreen({ onRestart, onContinue }: ResultsPerfectScreenProps) {
    const [showRedeemMessage, setShowRedeemMessage] = useState(false);
    const { playSound } = useAudioController();

    const handleRedeem = () => {
        playSound('success');
        setShowRedeemMessage(true);
    };

    // Auto-continue to Valentine flow after redeem message is shown
    useEffect(() => {
        if (showRedeemMessage) {
            const timer = setTimeout(() => {
                onContinue();
            }, 2500); // 2.5 seconds to read the message
            return () => clearTimeout(timer);
        }
    }, [showRedeemMessage, onContinue]);

    return (
        <div className="animate-scale-in space-y-6">
            <Card className="bg-card-gradient backdrop-blur-sm border-2 border-valentine-pink/20 shadow-valentine-lg p-6 sm:p-8 rounded-3xl">
                <div className="text-center space-y-6">
                    <div className="space-y-4">
                        <Sparkles className="w-16 h-16 mx-auto text-yellow-400 fill-yellow-400 animate-pulse" />
                        
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                            OMG 5/5!!! 😭💖
                        </h1>
                        
                        <p className="text-xl sm:text-2xl text-valentine-red font-semibold">
                            You are officially the BEST BOYFRIEND IN THE WORLD.
                        </p>
                    </div>

                    <div className="py-4">
                        <img 
                            src="/assets/generated/valentine-meme-perfect.dim_1200x900.png"
                            alt="Romantic couple celebration"
                            className="w-full max-w-md mx-auto rounded-2xl shadow-valentine"
                        />
                    </div>

                    <div className="bg-valentine-blush/30 border-2 border-valentine-pink rounded-2xl p-6 space-y-4">
                        <div className="text-4xl">🎟</div>
                        <h2 className="text-2xl font-bold text-foreground">
                            You have won a DATE COUPON!
                        </h2>
                        <p className="text-muted-foreground">
                            Redeemable for: One full day of love, food, cuddles & surprises.
                        </p>
                        
                        <img 
                            src="/assets/generated/date-coupon-card.dim_1200x700.png"
                            alt="Date coupon"
                            className="w-full max-w-sm mx-auto rounded-xl shadow-soft"
                        />

                        {!showRedeemMessage ? (
                            <Button
                                onClick={handleRedeem}
                                size="lg"
                                className="w-full sm:w-auto rounded-2xl bg-valentine-red hover:bg-valentine-red/90 text-white shadow-valentine transition-all hover:scale-105"
                            >
                                Redeem My Date 💌
                            </Button>
                        ) : (
                            <div className="animate-fade-in bg-valentine-pink/20 border border-valentine-pink rounded-xl p-4">
                                <p className="text-lg font-medium text-foreground">
                                    your girlfriend will contact you shortly
                                </p>
                            </div>
                        )}
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
            </Card>
        </div>
    );
}
