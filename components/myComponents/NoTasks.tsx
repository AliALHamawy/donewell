
const NoTasks = () => {
    return (
        <>
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center" >
                <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks size-6" aria-hidden="true">
                        <path d="M13 5h8"></path>
                        <path d="M13 12h8"></path>
                        <path d="M13 19h8"></path>
                        <path d="m3 17 2 2 4-4"></path>
                        <path d="m3 7 2 2 4-4"></path>
                    </svg>
                </span>
                <p className="mt-4 font-display text-lg font-semibold" >Your list is clear</p>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground" >Add a task above and take the first small step.</p>
            </div>
        </>
    )
}

export default NoTasks