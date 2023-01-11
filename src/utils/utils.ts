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
