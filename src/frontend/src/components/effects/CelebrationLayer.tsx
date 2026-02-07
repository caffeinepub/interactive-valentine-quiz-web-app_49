import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface CelebrationLayerProps {
    type: 'correct' | 'sparkle' | 'final' | 'valentine';
}

export function CelebrationLayer({ type }: CelebrationLayerProps) {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number; isHeart: boolean }>>([]);

    useEffect(() => {
        let particleCount = 15;
        if (type === 'final') particleCount = 50;
        if (type === 'valentine') particleCount = 80;
        if (type === 'sparkle') particleCount = 20;

        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * (type === 'valentine' ? 2 : 0.5),
            duration: 2 + Math.random() * 2,
            isHeart: type === 'valentine' ? Math.random() > 0.3 : true
        }));
        setParticles(newParticles);
    }, [type]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((particle) => {
                const isConfetti = type === 'valentine' && !particle.isHeart;
                
                return (
                    <div
                        key={particle.id}
                        className={cn(
                            'absolute',
                            type === 'sparkle' ? 'animate-sparkle' : 
                            isConfetti ? 'animate-confetti-spin' : 'animate-confetti-fall'
                        )}
                        style={{
                            left: `${particle.x}%`,
                            top: type === 'final' || type === 'valentine' ? '-10%' : `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`
                        }}
                    >
                        {type === 'sparkle' ? (
                            <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        ) : isConfetti ? (
                            <div 
                                className="w-3 h-3 rounded-sm"
                                style={{
                                    backgroundColor: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff6b9d'][Math.floor(particle.id % 5)]
                                }}
                            />
                        ) : (
                            <Heart className="w-5 h-5 text-valentine-red fill-valentine-red" />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
