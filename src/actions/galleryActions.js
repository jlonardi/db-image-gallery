export const ASC = 'ASC';
export const DESC = 'DESC';
export const NOP = 'NOP';

export const SORT_GRID = 'SORT_GRID';
export function sortGrid(sortDirection) {
    return {
        type: SORT_GRID,
        sortDirection
    };
}
