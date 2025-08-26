import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
  disabled?: boolean;
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className,
  disabled = false,
}: InfiniteScrollContainerProps) {
  const { ref, inView } = useInView({
    rootMargin: "200px",
    triggerOnce: false,
  });

  useEffect(() => {
    if (!disabled && inView) onBottomReached();
  }, [inView, disabled, onBottomReached]);

  return (
    <div className={className}>
      {children}
      {!disabled && (
        <div
          ref={ref}
          aria-hidden
          role="presentation"
          className="h-px w-full"
        />
      )}
    </div>
  );
}
