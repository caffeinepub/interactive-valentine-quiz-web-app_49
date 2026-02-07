import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '../quiz/ProgressBar';
import { OptionButton } from '../quiz/OptionButton';
import { CelebrationLayer } from '../effects/CelebrationLayer';
import { quizQuestions } from '../../content/quizContent';
import { useAudioController } from '../../hooks/useAudioController';

interface QuizScreenProps {
    onComplete: (score: number, answers: Record<number, string>) => void;
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebrationType, setCelebrationType] = useState<'correct' | 'sparkle'>('correct');
    const { playSound } = useAudioController();

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        
        const isCorrect = option === currentQuestion.correctAnswer;
        const isEverything = option === 'Everything' && currentQuestion.id === 4;

        if (isCorrect) {
            playSound('correct');
            if (isEverything) {
                setCelebrationType('sparkle');
            } else {
                setCelebrationType('correct');
            }
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 1500);
        } else {
            playSound('select');
        }
    };

    const handleNext = () => {
        if (!selectedOption) return;

        const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
        setAnswers(newAnswers);

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        } else {
            // Calculate final score
            const finalScore = Object.entries(newAnswers).reduce((score, [questionId, answer]) => {
                const question = quizQuestions.find(q => q.id === parseInt(questionId));
                return score + (question && answer === question.correctAnswer ? 1 : 0);
            }, 0);
            
            onComplete(finalScore, newAnswers);
        }
    };

    return (
        <div className="animate-scale-in">
            <Card className="bg-card-gradient backdrop-blur-sm border-2 border-valentine-pink/20 shadow-valentine-lg p-6 sm:p-8 rounded-3xl">
                <div className="space-y-6">
                    <ProgressBar 
                        current={currentQuestionIndex + 1} 
                        total={quizQuestions.length}
                        progress={progress}
                    />

                    <div className="space-y-6 py-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
                            {currentQuestion.question}
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => (
                                <OptionButton
                                    key={index}
                                    option={option}
                                    isSelected={selectedOption === option}
                                    onSelect={handleOptionSelect}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleNext}
                            disabled={!selectedOption}
                            size="lg"
                            className="rounded-2xl bg-valentine-red hover:bg-valentine-red/90 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                        </Button>
                    </div>
                </div>
            </Card>

            {showCelebration && <CelebrationLayer type={celebrationType} />}
        </div>
    );
}
