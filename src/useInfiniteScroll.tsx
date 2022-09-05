// import React from 'react';
// import { QueryClient, QueryClientProvider, useInfiniteQuery } from 'react-query';
//
// // todo
// // response pagination: page, pages
// export const useInfiniteScroll = (rowVirtualizer: any, length = 0, searchParam: any) => {
//
//
//     React.useEffect(() => {
//         const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
//
//         if (!lastItem) {
//             return
//         }
//
//         if (
//             lastItem.index >= length - 1 &&
//             hasNextPage &&
//             !isFetchingNextPage
//         ) {
//             fetchNextPage();
//         }
//     }, [
//         hasNextPage,
//         fetchNextPage,
//         length,
//         isFetchingNextPage,
//         rowVirtualizer.getVirtualItems(),
//     ])
//
//     return {
//         status,
//         data,
//         error,
//         isFetching,
//         isFetchingNextPage,
//         // fetchNextPage,
//         hasNextPage,
//     };
// };
