import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
          {
            'border-transparent bg-gray-900 text-gray-50': variant === 'default',
            'border-transparent bg-green-100 text-green-800': variant === 'success',
            'border-transparent bg-yellow-100 text-yellow-800': variant === 'warning',
            'border-transparent bg-red-100 text-red-800': variant === 'destructive',
            'text-gray-950': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
