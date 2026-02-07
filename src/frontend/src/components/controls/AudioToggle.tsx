import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '../../hooks/useAudioController';

export function AudioToggle() {
    const { isEnabled, toggleAudio } = useAudioStore();

    return (
        <Button
            onClick={toggleAudio}
            variant="outline"
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-sm border-2 border-valentine-pink/20 hover:bg-card shadow-soft"
            aria-label={isEnabled ? 'Disable audio' : 'Enable audio'}
        >
            {isEnabled ? (
                <Volume2 className="w-5 h-5 text-valentine-red" />
            ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
        </Button>
    );
}
