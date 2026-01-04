import { Sponsor } from "@/components/SponsorCard";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

interface GitHubSponsor {
    sponsorEntity: {
        login: string;
        name: string | null;
        avatarUrl: string;
        url: string;
        company?: string | null;
    };
    tier: {
        monthlyPriceInDollars: number;
        name: string;
    };
}

interface GitHubSponsorsResponse {
    data: {
        user: {
            sponsorshipsAsMaintainer: {
                nodes: GitHubSponsor[];
            };
        };
    };
}

export async function fetchGitHubSponsors(): Promise<Sponsor[]> {
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        console.warn("GITHUB_TOKEN not found, returning empty sponsors list");
        return [];
    }

    const query = `
        query {
            user(login: "amarnathdhumal") {
                sponsorshipsAsMaintainer(first: 100, includePrivate: false) {
                    nodes {
                        sponsorEntity {
                            ... on User {
                                login
                                name
                                avatarUrl
                                url
                                company
                            }
                            ... on Organization {
                                login
                                name
                                avatarUrl
                                url
                            }
                        }
                        tier {
                            monthlyPriceInDollars
                            name
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            console.error("GitHub API error:", response.statusText);
            return [];
        }

        const data: GitHubSponsorsResponse = await response.json();

        if (!data.data?.user?.sponsorshipsAsMaintainer?.nodes) {
            console.warn("No sponsors data found in response");
            return [];
        }

        const sponsors: Sponsor[] = data.data.user.sponsorshipsAsMaintainer.nodes
            .filter((node) => node.sponsorEntity) // Filter out private sponsors
            .map((node) => ({
                name: node.sponsorEntity.name || node.sponsorEntity.login,
                company: node.sponsorEntity.company || `@${node.sponsorEntity.login}`,
                githubUrl: node.sponsorEntity.url,
                avatarUrl: node.sponsorEntity.avatarUrl,
                amount: `$${node.tier.monthlyPriceInDollars} / month`,
            }));

        return sponsors;
    } catch (error) {
        console.error("Error fetching GitHub sponsors:", error);
        return [];
    }
}

// Placeholder sponsors to fill empty slots
export function getPlaceholderSponsors(count: number): Sponsor[] {
    const placeholders: Sponsor[] = [];
    for (let i = 0; i < count; i++) {
        placeholders.push({
            name: "Your Name",
            company: "Your Company",
            githubUrl: "https://github.com/sponsors/amarnathdhumal",
            amount: "$500/month",
        });
    }
    return placeholders;
}

// Get sponsors with placeholders to fill up to totalSlots
export async function getSponsorsWithPlaceholders(totalSlots: number = 4): Promise<Sponsor[]> {
    const realSponsors = await fetchGitHubSponsors();
    const placeholdersNeeded = Math.max(0, totalSlots - realSponsors.length);
    const placeholders = getPlaceholderSponsors(placeholdersNeeded);

    return [...realSponsors, ...placeholders];
}
