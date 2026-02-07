import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { LandingScreen } from './components/screens/LandingScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultsPerfectScreen } from './components/screens/ResultsPerfectScreen';
import { ValentineFlowScreen } from './components/screens/ValentineFlowScreen';

type AppScreen = 'landing' | 'quiz' | 'results-perfect' | 'valentine-flow';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const handleStartQuiz = () => {
        setCurrentScreen('quiz');
        setScore(0);
        setAnswers({});
    };

    const handleQuizComplete = (finalScore: number, finalAnswers: Record<number, string>) => {
        setScore(finalScore);
        setAnswers(finalAnswers);
        // Explicit conditional routing based on score
        if (finalScore === 5) {
            setCurrentScreen('results-perfect');
        } else {
            setCurrentScreen('valentine-flow');
        }
    };

    const handleContinueToValentine = () => {
        setCurrentScreen('valentine-flow');
    };

    const handleRestart = () => {
        setCurrentScreen('landing');
        setScore(0);
        setAnswers({});
    };

    return (
        <AppShell>
            {currentScreen === 'landing' && <LandingScreen onStart={handleStartQuiz} />}
            {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
            {currentScreen === 'results-perfect' && (
                <ResultsPerfectScreen 
                    onRestart={handleRestart} 
                    onContinue={handleContinueToValentine}
                />
            )}
            {currentScreen === 'valentine-flow' && <ValentineFlowScreen onRestart={handleRestart} />}
        </AppShell>
    );
}
