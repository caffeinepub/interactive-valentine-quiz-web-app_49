import { useEffect, useState } from 'react';
import { useAudioStore } from '../../hooks/useAudioController';

export function SpotifyEmbed() {
    const [isPlaying, setIsPlaying] = useState(false);
    const { duckBackgroundMusic, restoreBackgroundMusic } = useAudioStore();

    useEffect(() => {
        // Listen for Spotify player state changes via postMessage
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== 'https://open.spotify.com') return;
            
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'playback_update') {
                    const playing = !data.isPaused;
                    setIsPlaying(playing);
                    
                    if (playing) {
                        duckBackgroundMusic();
                    } else {
                        restoreBackgroundMusic();
                    }
                }
            } catch (e) {
                // Ignore parsing errors
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [duckBackgroundMusic, restoreBackgroundMusic]);

    // Spotify track ID for "There Is a Light That Never Goes Out" by The Smiths
    const trackId = '3XdZO5pVBp8wdZMRCLBjCJ';

    return (
        <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">our song 💖</p>
            <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player - There Is a Light That Never Goes Out"
            />
        </div>
    );
}
