import { useEffect, useRef } from 'react';
import { useAudioStore } from '../../hooks/useAudioController';

export function BackgroundMusicController() {
    const { isEnabled, backgroundMusicVolume, isDucked } = useAudioStore();
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    useEffect(() => {
        if (!isEnabled) {
            // Stop background music if audio is disabled
            if (oscillatorRef.current) {
                try {
                    oscillatorRef.current.stop();
                } catch (e) {
                    // Already stopped
                }
                oscillatorRef.current = null;
            }
            return;
        }

        // Initialize audio context and start soft background music
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;

        // Create a very soft, ambient background tone
        if (!oscillatorRef.current) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = 220; // Soft A note
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(backgroundMusicVolume, ctx.currentTime);

            oscillator.start();

            oscillatorRef.current = oscillator;
            gainNodeRef.current = gainNode;
        }

        return () => {
            if (oscillatorRef.current) {
                try {
                    oscillatorRef.current.stop();
                } catch (e) {
                    // Already stopped
                }
                oscillatorRef.current = null;
            }
        };
    }, [isEnabled, backgroundMusicVolume]);

    // Handle ducking when Spotify plays
    useEffect(() => {
        if (!gainNodeRef.current || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const targetVolume = isDucked ? 0.02 : backgroundMusicVolume;

        gainNodeRef.current.gain.cancelScheduledValues(ctx.currentTime);
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 0.5);
    }, [isDucked, backgroundMusicVolume]);

    return null; // This component doesn't render anything
}
