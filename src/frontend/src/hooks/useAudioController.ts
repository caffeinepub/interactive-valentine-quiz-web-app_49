import { create } from 'zustand';
import { useEffect, useRef } from 'react';

interface AudioState {
    isEnabled: boolean;
    backgroundMusicVolume: number;
    isDucked: boolean;
    toggleAudio: () => void;
    duckBackgroundMusic: () => void;
    restoreBackgroundMusic: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
    isEnabled: false,
    backgroundMusicVolume: 0.15, // Very soft background music
    isDucked: false,
    toggleAudio: () => set((state) => ({ isEnabled: !state.isEnabled })),
    duckBackgroundMusic: () => set({ isDucked: true }),
    restoreBackgroundMusic: () => set({ isDucked: false })
}));

export function useAudioController() {
    const { isEnabled } = useAudioStore();
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        if (isEnabled && !audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }, [isEnabled]);

    const playSound = (type: 'select' | 'correct' | 'success') => {
        if (!isEnabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Different frequencies for different sounds
        const frequencies = {
            select: 400,
            correct: 600,
            success: 800
        };

        oscillator.frequency.value = frequencies[type];
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.2);
    };

    return { isEnabled, playSound };
}
