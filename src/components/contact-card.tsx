import Link from 'next/link';

interface ContactCardProps {
  bgColor?: string;
  textColor?: string;
}

export function ContactCard({ 
  bgColor = "bg-blue-50 dark:bg-[#FF9B50]", 
  textColor = "text-neutral-900 dark:text-black" 
}: ContactCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-8 my-16 relative shadow-md transition-colors`}>
      <div className={`${textColor}`}>
        <h3 className="text-2xl font-bold mb-2">
          Want to discuss more with me.
        </h3>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <Link 
            href="https://cal.com/twiligthyabhi/catchup" 
            target="_blank"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 dark:bg-black px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-neutral-800 transition-colors"
          >
            Book a call
          </Link>
          <Link
            href="mailto:hi@abhiramnj.com"
            className="inline-flex items-center justify-center text-sm font-medium text-blue-600 dark:text-black underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Email me
          </Link>
        </div>
      </div>
    </div>
  );
}
