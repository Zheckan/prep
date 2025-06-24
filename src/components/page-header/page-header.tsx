interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl backdrop-saturate-150'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
          {title}
        </h1>
        <p className='text-gray-50'>{description}</p>
      </div>
    </div>
  );
};
