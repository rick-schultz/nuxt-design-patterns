export type SortType = 'byDateAsc' | 'byPriorityDesc' | 'byTitleAsc';

export interface SortOption {
  key: SortType;
  label: string;
}
