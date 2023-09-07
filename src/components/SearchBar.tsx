import { cn } from '@/lib/utils';
import { FilledStarIcon } from './icons/FilledStarIcon';
import { SearchIcon } from './icons/SearchIcon';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/Tooltip';

type Props = {
  onChange: (value: string) => void;
  filterStarred: {
    value: boolean;
    toggle: () => void;
  };
};

export function SearchBar({ onChange, filterStarred }: Props) {
  return (
    <div className="flex w-full max-w-3xl items-center gap-3 rounded-md border border-accent-foreground bg-accent p-2">
      <SearchIcon className="h-7 w-7 text-secondary-foreground" />
      <input
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white p-1 focus:outline-ring"
        name="search"
      />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            onClick={filterStarred.toggle}
            className={cn('flex items-center gap-1 text-gray-400', filterStarred.value && 'text-primary')}
          >
            Favoritos <FilledStarIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="bg-primary-foreground shadow">
            <p className="font-bold text-secondary-foreground">Filtrar por favoritos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
