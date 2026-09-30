import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

const Logo = ({ icoClass, textClass }: { icoClass?: string; textClass?: string }) => {
    return (
        <div className="flex items-center gap-2">
            <span className={cn("grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground", icoClass)} >
{/*             
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check size-[23px]" aria-hidden="true" ><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
             */}

            <CircleCheck className={`${icoClass}`} />

            </span>
            <span className={cn("text-md font-medium text-forground", textClass)}>Donewell</span>
        </div>
    )
}

export default Logo