
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage:
                    'radial-gradient(circle at 12% 18%, color-mix(in oklch, var(--primary) 10%, transparent), transparent 34%)',
            }}
        >
            {children}
        </div>

    )
}

export default layout