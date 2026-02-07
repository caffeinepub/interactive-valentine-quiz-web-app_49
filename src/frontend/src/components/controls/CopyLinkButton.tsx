import { Button } from '@/components/ui/button';
import { Share2, Check } from 'lucide-react';
import { useCopyLink } from '../../hooks/useCopyLink';

export function CopyLinkButton() {
    const { copied, copyLink } = useCopyLink();

    return (
        <Button
            onClick={copyLink}
            variant="outline"
            className="rounded-2xl border-2 transition-all"
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    Link Copied!
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                </>
            )}
        </Button>
    );
}
