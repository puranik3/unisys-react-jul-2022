import { useState, useEffect } from 'react';

// NOTE: Discussion on debouncing
// import { getSearchresults } from '';
// const debouncedSearch = debounce( getSearchresults );

const useFilter = ( items ) => {
    const [ filteredItems, setFilteredItems ] = useState( items );
    const [ filterKey, setFilterKey ] = useState('');
    
    useEffect(() => {
        // NOTE: Discussion on debouncing
        // the underlying function is called only if a fixed time has passed since last change to filterKey
        // debouncedSearch( filterKey )
        
        const filteredItems = items.filter(
            item => item.name.includes( filterKey )
        );
        setFilteredItems( filteredItems );

    }, [ filterKey, items ]);

    return {
        filteredItems,
        filterKey,
        setFilterKey
    }
};

export default useFilter;