import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const currencyFormater = new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' });