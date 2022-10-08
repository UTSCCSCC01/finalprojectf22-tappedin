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

// JUST THROW AN ERROR, async function error will just auto error handler for express 5.0...
export type Result<T> = RequireAtLeastOne<BaseResult<T>, "error" | "data">;