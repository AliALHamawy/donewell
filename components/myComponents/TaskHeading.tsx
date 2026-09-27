


const TaskHeading = ({ title, subtitle, description }: { title: string; subtitle: string; description: string }) => {
    return (
        <>
        <div className="flex flex-col gap-2 w-full items-start">
            <h1 className="text-md text-primary font-normal tracking-tight">{title}</h1>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">{subtitle}</h2>
            <h3 className="mt-3 text-muted-foreground">{description}</h3>
        </div>
        </>
    )
}

export default TaskHeading