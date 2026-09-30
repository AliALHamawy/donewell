import AuthCard from '@/components/myComponents/AuthCard';
import AuthHeading from '@/components/myComponents/AuthHeading';
import Logo from '@/components/myComponents/Logo';

const page = () => {
  return (
    <>
      <div className="flex max-w-6xl w-full m-auto">
        {/* left */}
        <div className="hidden sm:flex max-w-6/10 w-full flex-col items-start gap-4">
          <Logo icoClass="size-11 p-1 flex " textClass="text-xl" />
          <AuthHeading />
          <div className="flex gap-8 text-sm text-muted-foreground" >
            <span data-tsd-source="/src/components/auth-page.tsx:54:13">
              <strong className="block text-2xl text-foreground" data-tsd-source="/src/components/auth-page.tsx:54:19">Focused</strong>by design
            </span>
            <span data-tsd-source="/src/components/auth-page.tsx:55:13">
              <strong className="block text-2xl text-foreground" data-tsd-source="/src/components/auth-page.tsx:55:19">Private</strong>to your space
            </span>
          </div>
        </div>
        {/* right */}
        <div className="flex sm:max-w-4/10 w-full flex-col items-center gap-4 p-4">
          <div className="sm:hidden">
            <Logo icoClass="size-11" textClass="text-xl" />
          </div>
          <AuthCard />
          <p className="text-sm text-red-500">Make sure to save the password u can't reset it.</p>
        </div>
      </div>
    </>
  )
}

export default page