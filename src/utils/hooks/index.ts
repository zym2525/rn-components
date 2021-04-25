import * as React from 'react';
import _, { DebouncedFunc } from 'lodash';

const { useRef, useEffect, useState, useCallback } = React;

export function useEventCallback<T extends (...args: any[]) => any>(fn: T, deps: any[] = []) {
    const ref = useRef<T | (() => never)>(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useEffect(() => {
        ref.current = fn;
    }, [fn, ...deps]);

    return useCallback(() => {
        const fn = ref.current;
        return fn();
    }, [ref]);
}

export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number = 100, dep: any[] = []) {
    let fnRef = React.useRef<T>(fn);
    // let testRef = React.useRef();

    React.useEffect(() => {
        fnRef.current = fn;
    }, [fn])

    let debounceFn: DebouncedFunc<T> = React.useCallback(_.debounce(fnRef.current, delay, {
        'leading': true,
        'trailing': false
    }), [fnRef, ...dep]);

    React.useEffect(() => {
        return () => {
            debounceFn.cancel();
        }
    }, [])

    return debounceFn;
}

export function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function useForceUpdate() {
    const [, forceUpdate] = React.useReducer(x => x + 1, 0);
    return forceUpdate;
}

export function useClientRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}

export function useSafeRequest<T>(fn: () => T, callback: (res: T) => void, deps: any[] = []) {
    useEffect(() => {
        let ignore = false;
        async function getData() {
            const response = await fn();
            if (!ignore) callback(response);
        }

        getData();
        return () => { ignore = true };
    }, deps);
}

export function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef<() => void>(callback);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return () => { };
    }, [delay]);
}