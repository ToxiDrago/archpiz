export function selectFilter(state: any): any;
export function selectSort(state: any): any;
export const setCategoryId: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "filters/setCategoryId">;
export const setSort: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "filters/setSort">;
export const setCurrentPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "filters/setCurrentPage">;
export const setFilters: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "filters/setFilters">;
export const setSearchValue: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "filters/setSearchValue">;
declare const _default: import("redux").Reducer<{
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: {
        name: string;
        sortProperty: string;
    };
}>;
export default _default;
