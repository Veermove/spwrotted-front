import { Post } from "./Post";

const formatter = Intl.NumberFormat("en", {notation: "compact"});

export type PublishLikeOrUnlikeFunction =
    (likedOrUnliked: boolean) => Promise<number>

export const formatNumber = (input: number) =>
    formatter.format(input)

export const uniq = (input: string[]): string[] =>
    Object.keys(
        input.reduce(
            (acc, el) => { acc[el] = 1; return acc; },
            {} as Partial<Record<string, number>>,
        ),
    )

export const uniqPosts = (input: Post[]): Post[] => {
    const result = {} as Record<string, Post>;

        input.forEach(
            (p) => {result[p.id] = p; }
        )

    return Object.values(result);

}
