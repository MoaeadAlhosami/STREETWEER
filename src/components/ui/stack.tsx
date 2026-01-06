"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
    disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        }
        x.set(0);
        y.set(0);
    }

    if (disableDrag) {
        return (
            <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

interface StackProps {
    randomRotation?: boolean;
    sensitivity?: number;
    sendToBackOnClick?: boolean;
    cards?: React.ReactNode[];
    animationConfig?: { stiffness: number; damping: number };
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    mobileClickOnly?: boolean;
    mobileBreakpoint?: number;
    className?: string;
}

export function Stack({
    randomRotation = false,
    sensitivity = 150,
    cards = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = true,
    autoplay = false,
    autoplayDelay = 4000,
    pauseOnHover = true,
    mobileClickOnly = false,
    mobileBreakpoint = 768,
    className,
}: StackProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < mobileBreakpoint);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [mobileBreakpoint]);

    const [stack, setStack] = useState<{ id: number; content: React.ReactNode; randomRotate: number }[]>(() =>
        cards.map((content, index) => ({
            id: index + 1,
            content,
            randomRotate: randomRotation ? Math.random() * 10 - 5 : 0,
        }))
    );

    useEffect(() => {
        const t = setTimeout(() => {
            setStack(
                cards.map((content, index) => ({
                    id: index + 1,
                    content,
                    randomRotate: randomRotation ? Math.random() * 10 - 5 : 0,
                }))
            );
        }, 0);
        return () => clearTimeout(t);
    }, [cards, randomRotation]);

    const sendToBack = useCallback((id: number) => {
        setStack((prev) => {
            const newStack = [...prev];
            const index = newStack.findIndex((card) => card.id === id);
            if (index === -1) return prev;
            const [card] = newStack.splice(index, 1);
            newStack.unshift(card);
            return newStack;
        });
    }, []);

    useEffect(() => {
        if (autoplay && stack.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;
                sendToBack(topCardId);
            }, autoplayDelay);
            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    return (
        <div
            className={cn("relative w-full aspect-[4/5]", className)}
            style={{ perspective: 1000 }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {stack.map((card, index) => {
                const isTop = index === stack.length - 1;

                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        disableDrag={shouldDisableDrag || !isTop}
                    >
                        <motion.div
                            className="rounded-[3.5rem] overflow-hidden w-full h-full shadow-[0_35px_80px_-25px_rgba(0,0,0,0.4)] border border-white/10"
                            onClick={() => shouldEnableClick && isTop && sendToBack(card.id)}
                            animate={{
                                rotateZ: (stack.length - index - 1) * -4 + card.randomRotate,
                                scale: 1 - (stack.length - index - 1) * 0.06,
                                y: (stack.length - index - 1) * -15,
                                x: (stack.length - index - 1) * -5,
                                opacity: 1 - (stack.length - index - 1) * 0.15,
                                zIndex: index,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping,
                            }}
                        >
                            {card.content}
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}

