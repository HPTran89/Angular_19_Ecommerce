// Credit to Theo (https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b)
// Theo's preferred way of handling try/catch in TypeScript

// Types of the result object with discriminated union
type Success<T> = {
    data: T;
    error: null;
};

type Failure<E> = {
    data: null;
    error: E;
}

type Result<T, E = Error> = Success<T> | Failure<E>;

// main wrapper function
export async function tryCatch<T, E = Error>(promise: Promise<T>) : Promise<Result<T, E>> {
    try {
        const data = await promise;
        return {data, error: null};
    } catch (err) {
        return { data: null, error: err as E };
    }
}