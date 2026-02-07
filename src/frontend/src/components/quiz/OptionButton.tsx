import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OptionButtonProps {
    option: string;
    isSelected: boolean;
    onSelect: (option: string) => void;
}

export function OptionButton({ option, isSelected, onSelect }: OptionButtonProps) {
    return (
        <Button
            onClick={() => onSelect(option)}
            variant="outline"
            className={cn(
                'w-full p-6 text-left text-base sm:text-lg rounded-2xl border-2 transition-all',
                'hover:scale-[1.02] hover:shadow-soft hover:border-valentine-pink',
                isSelected 
                    ? 'bg-valentine-pink/20 border-valentine-pink shadow-valentine scale-[1.02]' 
                    : 'bg-card border-border'
            )}
        >
            {option}
        </Button>
    );
}
