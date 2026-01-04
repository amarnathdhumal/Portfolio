import ViewArea from "@/components/ui/view-area";
import BlurFadeText from "@/components/ui/blur-fade-text";
import SponsorCard from "@/components/SponsorCard";
import BlurFade from "@/components/ui/blur-fade";
import { ActionButton } from "@/components/ui/action-button";
import Link from "next/link";
import { getSponsorsWithPlaceholders } from "@/lib/github-sponsors";

// Revalidate every hour
export const revalidate = 3600;

export default async function SponsorsPage() {
    const sponsors = await getSponsorsWithPlaceholders(4);

    return (
        <div className="w-full pt-[66px] bg-white dark:bg-black">
            <ViewArea showBorderTop={false} className="flex flex-col h-screen">

                <div>
                    <BlurFadeText
                        delay={0.1}
                        className="text-[24px] md:text-[36px] font-outfit text-foreground tracking-normal font-medium leading-none"
                        text="Sponsors"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-6">
                    {sponsors.map((sponsor, index) => (
                        <BlurFade key={index} delay={0.1 + index * 0.05} inView>
                            <SponsorCard sponsor={sponsor} />
                        </BlurFade>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <BlurFade delay={0.4} inView>
                        <ActionButton asChild>
                            <Link href="https://github.com/sponsors/amarnathdhumal" target="_blank">
                                Sponsor My Work
                            </Link>
                        </ActionButton>
                    </BlurFade>
                </div>
            </ViewArea>
        </div>
    );
}
