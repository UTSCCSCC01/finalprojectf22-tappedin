export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>> 
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

type BaseResult<T> =
{
  data?: T;
  error?: Error;
}

export type Result<T> = RequireAtLeastOne<BaseResult<T>, "error" | "data">;