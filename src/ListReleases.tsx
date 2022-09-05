import { Box } from 'rebass';
import React  from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';

const Image = styled('img')`
  object-fit: cover;
`;

async function fetchData(
    searchParam: number,
    offset: number = 0,
) {
    let rows: any;

    await fetch(`http://localhost:3003/music/releases/${searchParam}/${offset}`)
        .then((res) => {
            return res.text();
        })
        .then(
            (result) => {
                rows = JSON.parse(result);
            });

    return rows;
}

export const ListReleases: React.FC<any> = ({searchParam, parentRef}) => {
    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ['releases', searchParam],
        (ctx: any) => {
            return fetchData(searchParam, ctx.pageParam)
        },
        {
            getNextPageParam: (lastPage, pages) => {
                // console.log("getNextPageParam --- ", lastPage, pages);
                return lastPage.pagination.page < lastPage.pagination.pages ?  lastPage.pagination.page + 1 : null;
            },
        }
    );

    const allRows = data ? data.pages.flatMap((d) => d.releases) : [];

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        // count: data?.length,
        count: hasNextPage ? allRows.length + 1 : allRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 292, // как померить размер блока? thumb height, title size
    })

    // console.log("status, data ... ", status, data, searchParam, error, isFetching);

    React.useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        if (!lastItem) {
            return;
        }

        if (
            lastItem.index >= allRows.length - 1 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [
        hasNextPage,
        fetchNextPage,
        allRows.length,
        isFetchingNextPage,
        rowVirtualizer.getVirtualItems(),
    ]);

    return (<div
        style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
        }}
    >
        {/* Only the visible items in the virtualizer, manually positioned to be in view */}
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const isLoaderRow = virtualItem.index > allRows?.length - 1
            const item = allRows?.[virtualItem.index];

            return (
                <Box
                    key={virtualItem.key}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                    }}
                >
                    {isLoaderRow
                        ? hasNextPage
                            ? 'Loading more...'
                            : 'Nothing more to load'
                        : <Box key={item?.id} padding="10px" width="200px">
                            <Image width="146px" src={item?.thumb}/>
                            <h3>{item?.title} {item?.year}</h3>
                        </Box>}
                </Box>
            );
        })}
    </div>);
};
