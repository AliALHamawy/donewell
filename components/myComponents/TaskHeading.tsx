

const TaskHeading = () => {
    return (
        <>
        <div className="flex flex-col gap-2 w-full items-start">
            <h1 className="text-md text-primary font-normal tracking-tight">MY TASKS</h1>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">What needs doing?</h2>
            <h3 className="mt-3 text-muted-foreground">One clear list for a focused day.</h3>
        </div>
        </>
    )
}

export default TaskHeading