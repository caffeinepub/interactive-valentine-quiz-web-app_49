import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
}

export function FloatingHeartsBackground() {
    const [hearts, setHearts] = useState<FloatingHeart[]>([]);

    useEffect(() => {
        const heartCount = 15;
        const newHearts = Array.from({ length: heartCount }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10,
            size: 20 + Math.random() * 20
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute animate-float-up"
                    style={{
                        left: `${heart.left}%`,
                        bottom: '-10%',
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                        animationIterationCount: 'infinite'
                    }}
                >
                    <Heart 
                        className="text-valentine-pink fill-valentine-pink"
                        style={{ width: `${heart.size}px`, height: `${heart.size}px` }}
                    />
                </div>
            ))}
        </div>
    );
}
