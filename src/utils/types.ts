export type PickKeyType<T, K extends string> = K extends keyof T ? T[K] : any

export type Fn = (...args: any[]) => any;

export type $Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type $RemoveChildren<T extends React.ComponentType<any>> = $Omit<
    React.ComponentPropsWithoutRef<T>,
    'children'
>;