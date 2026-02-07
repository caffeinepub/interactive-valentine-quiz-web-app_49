import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
    current: number;
    total: number;
    progress: number;
}

export function ProgressBar({ current, total, progress }: ProgressBarProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className="font-medium">Question {current}/{total}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <Progress 
                value={progress} 
                className="h-2 bg-valentine-beige"
            />
        </div>
    );
}
