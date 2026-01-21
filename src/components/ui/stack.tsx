"use client";

import { motion, useMotionValue, useTransform, PanInfo, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { cn } from "@/lib/utils";

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
    disableDrag?: boolean;
}

const CardRotate = memo(function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const prefersReducedMotion = useReducedMotion();
    
    // تقليل نطاق الدوران لتقليل استهلاك GPU
    const rotateX = useTransform(y, [-100, 100], prefersReducedMotion ? [0, 0] : [15, -15]);
    const rotateY = useTransform(x, [-100, 100], prefersReducedMotion ? [0, 0] : [-15, 15]);

    const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        }
        x.set(0);
        y.set(0);
    }, [sensitivity, onSendToBack, x]);

    if (disableDrag) {
        return (
            <motion.div 
                className="absolute inset-0 cursor-pointer" 
                style={{ x: 0, y: 0 }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ 
                x, 
                y, 
                rotateX, 
                rotateY,
                // تحسين GPU acceleration
                willChange: "transform",
            }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.4}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison لتقليل إعادة التصيير
    return prevProps.disableDrag === nextProps.disableDrag &&
           prevProps.sensitivity === nextProps.sensitivity;
});

interface AnimatedCardProps {
    content: React.ReactNode;
    animationValues: {
        rotateZ: number;
        scale: number;
        y: number;
        x: number;
        opacity: number;
        zIndex: number;
    };
    transitionConfig: {
        type: string;
        stiffness: number;
        damping: number;
        duration?: number;
    };
    isTop: boolean;
    onClick?: () => void;
}

const AnimatedCard = memo(function AnimatedCard({ 
    content, 
    animationValues, 
    transitionConfig, 
    isTop, 
    onClick 
}: AnimatedCardProps) {
    return (
        <motion.div
            className="rounded-[3.5rem] overflow-hidden w-full h-full shadow-[0_35px_80px_-25px_rgba(0,0,0,0.4)] border border-white/10"
            onClick={onClick}
            animate={animationValues}
            transition={transitionConfig}
            style={{
                // تحسين GPU acceleration
                willChange: isTop ? "transform" : "auto",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
            }}
        >
            {content}
        </motion.div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison - فقط إعادة التصيير عند تغيير القيم المهمة
    return (
        prevProps.isTop === nextProps.isTop &&
        prevProps.animationValues.zIndex === nextProps.animationValues.zIndex &&
        Math.abs(prevProps.animationValues.scale - nextProps.animationValues.scale) < 0.01 &&
        Math.abs(prevProps.animationValues.opacity - nextProps.animationValues.opacity) < 0.01
    );
});

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
    const prefersReducedMotion = useReducedMotion();

    // تحسين resize listener باستخدام debounce
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkMobile = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsMobile(window.innerWidth < mobileBreakpoint);
            }, 150);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        return () => {
            window.removeEventListener("resize", checkMobile);
            clearTimeout(timeoutId);
        };
    }, [mobileBreakpoint]);

    // Memoize initial stack لتجنب إعادة الحساب
    const initialStack = useMemo(() => 
        cards.map((content, index) => ({
            id: index + 1,
            content,
            randomRotate: randomRotation && !prefersReducedMotion ? Math.random() * 5 - 2.5 : 0,
        }))
    , [cards, randomRotation, prefersReducedMotion]);

    const [stack, setStack] = useState<{ id: number; content: React.ReactNode; randomRotate: number }[]>(initialStack);

    useEffect(() => {
        setStack(initialStack);
    }, [initialStack]);

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
                const topCardId = stack[stack.length - 1]?.id;
                if (topCardId) {
                    sendToBack(topCardId);
                }
            }, autoplayDelay);
            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused, sendToBack]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    // تحسين إعدادات الرسوم المتحركة لتقليل استهلاك الموارد
    const optimizedAnimationConfig = useMemo(() => ({
        stiffness: prefersReducedMotion ? 300 : Math.min(animationConfig.stiffness, 200),
        damping: prefersReducedMotion ? 30 : Math.max(animationConfig.damping, 25),
    }), [animationConfig, prefersReducedMotion]);

    return (
        <div
            className={cn("relative w-full aspect-[4/5]", className)}
            style={{ 
                perspective: prefersReducedMotion ? 0 : 1000,
                // تحسين GPU rendering
                transform: "translateZ(0)",
                willChange: "contents",
            }}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {stack.map((card, index) => {
                const isTop = index === stack.length - 1;
                const stackPosition = stack.length - index - 1;
                
                // إخفاء البطاقات البعيدة جداً لتقليل استهلاك الموارد (أكثر من 3 بطاقات خلفية)
                if (stackPosition > 3) {
                    return null;
                }
                
                // حساب القيم مباشرة بدون hooks
                const animationValues = {
                    rotateZ: prefersReducedMotion ? 0 : (stackPosition * -3 + card.randomRotate),
                    scale: 1 - (stackPosition * 0.05),
                    y: stackPosition * -12,
                    x: stackPosition * -4,
                    opacity: Math.max(0.7, 1 - (stackPosition * 0.12)),
                    zIndex: index,
                };

                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        disableDrag={shouldDisableDrag || !isTop}
                    >
                        <AnimatedCard
                            content={card.content}
                            animationValues={animationValues}
                            transitionConfig={{
                                type: "spring",
                                stiffness: optimizedAnimationConfig.stiffness,
                                damping: optimizedAnimationConfig.damping,
                                duration: prefersReducedMotion ? 0.3 : undefined,
                            }}
                            isTop={isTop}
                            onClick={shouldEnableClick && isTop ? () => sendToBack(card.id) : undefined}
                        />
                    </CardRotate>
                );
            })}
        </div>
    );
}

