import React, { useRef } from 'react';
import { Box } from 'rebass';
import { fetchProfileData } from '../suspenseApi';
import { useOutSideClicker } from '../useOutSideClicker';

const resource = fetchProfileData();

export const SearchSuggestions: React.FC<{ query: string; updateContent: any }> = ({updateContent}) => {
    const suggestions = resource.suggestions.read();
    const wrapperRef = useRef(null);
    useOutSideClicker(wrapperRef);

    const onClick = (suggestion: any) => {
        updateContent(suggestion);
        if (wrapperRef?.current) {
            (wrapperRef.current as any).style.display = "none";
        }
        localStorage.setItem("suggestion", suggestion.title);
    };

    return <Box id="suggestions" ref={wrapperRef} style={{position: 'absolute', width: '100%', zIndex: 1}} backgroundColor="white">
        {suggestions?.map((suggestion: {id: string; title: string}) => <Box key={suggestion.id} style={{border: '1px solid gray', cursor: 'pointer'}} onClick={() => onClick(suggestion)}>{suggestion.title}</Box>)}
    </Box>;

};
