/**
 * @fileoverview Typewriter effect hook
 * @description Animated text typing effect for hero sections
 */

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
    words: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    delayBetweenWords?: number;
    loop?: boolean;
}

interface UseTypewriterReturn {
    text: string;
    isTyping: boolean;
    isDeleting: boolean;
    currentWordIndex: number;
}

/**
 * Custom hook for typewriter text animation effect
 * @param options - Configuration for the typewriter effect
 * @returns Current text state and animation status
 */
export function useTypewriter(options: UseTypewriterOptions): UseTypewriterReturn {
    const {
        words,
        typeSpeed = 100,
        deleteSpeed = 50,
        delayBetweenWords = 2000,
        loop = true,
    } = options;

    const [text, setText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const type = useCallback(() => {
        const currentWord = words[currentWordIndex];

        if (isDeleting) {
            // Deleting characters
            setText((prev) => prev.slice(0, -1));

            if (text === '') {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= words.length) {
                        return loop ? 0 : prev;
                    }
                    return nextIndex;
                });
            }
        } else {
            // Typing characters
            if (text.length < currentWord.length) {
                setText(currentWord.slice(0, text.length + 1));
            } else {
                // Word complete, wait before deleting
                setIsTyping(false);
                setTimeout(() => {
                    setIsTyping(true);
                    setIsDeleting(true);
                }, delayBetweenWords);
                return;
            }
        }
    }, [text, currentWordIndex, isDeleting, words, loop, delayBetweenWords]);

    useEffect(() => {
        if (!isTyping) return;

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        const timeout = setTimeout(type, speed);

        return () => clearTimeout(timeout);
    }, [type, isTyping, isDeleting, typeSpeed, deleteSpeed]);

    return {
        text,
        isTyping,
        isDeleting,
        currentWordIndex,
    };
}
