import React from "react"
import clsx from 'clsx'

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}


const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({as: Comp = "section", className, children, ...restProps}, ref) => {
        return (
            <Comp ref={ref} className={"px-4 md:px-6 "}
            {...restProps}>
                <div className={clsx("mx-auto w-full max-w-7xl", className)}>
                    {children}
                </div>
            </Comp>
        )
    }
)

Bounded.displayName = "Bounded"

export default Bounded