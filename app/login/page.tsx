import LoginForm from '@/app/ui/login-form';
import Link from 'next/link';

export default function LoginPage() {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
        <LoginForm />
        </div>
        <div className='text-white'>

        <Link href="/register" style={{ textDecoration: 'underline', color: 'white' }}>
         Don't have an account? Sign up here!
      </Link>
         
          
        </div>
        </main>
        
      </div>
    );
  }