import { writable } from 'svelte/store';

export const user = writable<{ userid: string; username: string }>();
