import { BookOpenCheck, House } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  description: string;
  topicHome?: string;
}

export const PageHeader = ({
  description,
  title,
  topicHome,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className='fixed top-0 right-0 left-0 z-50 border-white/10 border-b bg-black/30 backdrop-blur-xl backdrop-saturate-150'>
      <div className='mx-auto max-w-4xl px-6 py-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='mb-2 font-bold text-3xl text-white md:text-4xl'>
              {title}
            </h1>
            <p className='text-gray-50'>{description}</p>
          </div>
          <div className='flex items-center gap-4'>
            {topicHome && (
              <button
                aria-label='Go to topic home'
                className='text-white transition-colors hover:text-yellow-500'
                onClick={() => router.push(topicHome)}
                type='button'
              >
                <BookOpenCheck size={24} />
              </button>
            )}
            <button
              aria-label='Go to home page'
              className='text-white transition-colors hover:text-yellow-500'
              onClick={() => router.push('/')}
              type='button'
            >
              <House size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
