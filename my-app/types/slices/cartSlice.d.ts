export function selectCart(state: any): any;
export function selectCartItemById(id: any): (state: any) => any;
export const addItem: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "cart/addItem">;
export const removeItem: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "cart/removeItem">;
export const minusItem: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "cart/minusItem">;
export const clearItems: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "cart/clearItems">;
declare const _default: import("redux").Reducer<{
    totalPrice: number;
    items: any[];
}>;
export default _default;
