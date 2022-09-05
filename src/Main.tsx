import { Normalize } from 'styled-normalize';
import React, {
    Suspense,
    useDeferredValue,
    useMemo,
    useRef,
    useState,
    useTransition
} from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { Label } from '@rebass/forms';
import { SearchSuggestions } from './components/SearchSuggestions';
import { ListReleases } from './ListReleases';

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  overflow: auto; // Make it scroll!
  // height: 100%; 502
`;

// mui?
// {cover_image: string, title: string} | null
export const Main = (): JSX.Element => {
    const inputRef = useRef(null);
    const parentRef = useRef(null);
    const [content, setContent] = useState<any | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [searchParam, setSearchParam] = useState<{id: string; title: string} | null>(null);
    const [isPending, startTransition] = useTransition();

    const deferredInputValue = useDeferredValue(inputValue);
    // console.log("Container -- ", Container.height); todo ?
    // console.log("content?.length -- ", content?.length);
    console.log("deferredInputValue -- ", deferredInputValue, inputValue);

    const updateContent = (suggestion: {id: string; title: string} | null) => {
        startTransition(() => {
            setSearchParam(suggestion);
        });
    };

    // useEffect(() => {
    //     // SSE?
    //     if (searchParam) {
    //         fetch(`http://localhost:3003/music/releases/${searchParam?.id}`)
    //             .then((res) => {
    //                 return res.text();
    //             })
    //             .then(
    //                 (result) => {
    //                     const releases = JSON.parse(result).releases;
    //                     // const releases = JSON.parse(result).releases?.sort((a: any, b: any) => {
    //                     //     const intA = parseInt(a.year);
    //                     //     const intB = parseInt(b.year);
    //                     //
    //                     //     if (intA < intB) {
    //                     //         return 1;
    //                     //     }
    //                     //     if (intA > intB) {
    //                     //         return -1;
    //                     //     }
    //                     //     return 0;
    //                     // });
    //
    //                     // console.log("inside transition -- ", releases);
    //                     setContent(releases);
    //                     window.electronAPI.notify();
    //                 },
    //                 // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    //                 // чтобы не перехватывать исключения из ошибок в самих компонентах.
    //                 (error) => {
    //                     console.log('error --- ', error);
    //                 },
    //             );
    //     }
    // }, [searchParam]);

    const onSuggestionClick = (suggestion: any) => {
        console.log("click -- ", suggestion);
        updateContent(suggestion);
        setInputValue(suggestion?.title);
        if (suggestion?.title) {
            window.electronAPI.setTitle(suggestion?.title)
        }
    };

    // query param not used (until not sending it to the request)
    const suggestions = useMemo(() =>
            <SearchSuggestions query={deferredInputValue} updateContent={onSuggestionClick} />,
        [deferredInputValue]
    );

    const onLinkClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        window.electronAPI.open('https://www.electronjs.org/docs/api/protocol');
    };

    return (
        <Box height="100%">
            <Normalize />
            <Flex height="100%">
            <Box marginBottom="20px" padding="10px" width="150px" minWidth="150px" height="100%" backgroundColor="lightBlue">
                <p>Open the <a onClick={onLinkClick} href="https://www.electronjs.org/docs/api/protocol">
                    full protocol API documentation</a> in your browser.</p>
                <p>
                    Then: Launch the app from a web link!
                    <a href="electron-fiddle://open">Click here to launch the app</a>
                </p>
            </Box>
            <Flex flexDirection="column" flexGrow={1}>
                <Flex alignItems="center" marginTop="20px" marginBottom="20px">
                    <Label width="130px" paddingLeft="10px">Click on an artist:</Label>
                    <Box style={{position: 'relative', marginLeft: '10px'}}>
                        <input ref={inputRef} id="searchInput" autoFocus style={{height: '20px'}} value={inputValue ?? ""} readOnly />
                        <Suspense fallback={<div>Loading artists...</div>}>
                            {suggestions}
                        </Suspense>
                    </Box>
                </Flex>
                <Container ref={parentRef}>
                    {
                        searchParam ?
                            <ListReleases searchParam={searchParam.id} parentRef={parentRef} />
                            : null
                    }
                    {/*{content?.map((item: any) =>*/}
                    {/*    <Box key={item.id} padding="10px" width="200px">*/}
                    {/*        <Image width="146px" src={item.thumb} />*/}
                    {/*        <h3>{item.title} {item.year}</h3>*/}
                    {/*    </Box>*/}
                    {/*)}*/}
                </Container>
            </Flex>
            </Flex>
        </Box>
    );
};

