import Image from "next/image";
import Link from "next/link";

export interface Sponsor {
    name: string;
    company: string;
    githubUrl: string;
    avatarUrl?: string;
    amount: string;
}

interface SponsorCardProps {
    sponsor: Sponsor;
}

const SponsorCard = ({ sponsor }: SponsorCardProps) => {
    return (
        <Link
            href={sponsor.githubUrl}
            target="_blank"
            className="group border dark:border-neutral-800 border-neutral-200 rounded-md relative transition-all duration-300 cursor-pointer p-4 block"
        >
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-2xl overflow-hidden">
                    {sponsor.avatarUrl && (
                        <Image
                            src={sponsor.avatarUrl}
                            alt={sponsor.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-lg">{sponsor.name}</span>
                    <span className="text-sm text-text-secondary flex items-center gap-1 transition-colors">
                        {sponsor.company}
                    </span>
                </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-sm">
                <span className="text-text-secondary">Contribution</span>
                <span className="font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                    {sponsor.amount}
                </span>
            </div>
        </Link>
    );
};

export default SponsorCard;
