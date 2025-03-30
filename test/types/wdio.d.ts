import { Browser } from '@wdio/globals';

declare module '@wdio/globals' {
    interface Browser {
        execute: (fn: () => any) => Promise<any>;
    }
} 