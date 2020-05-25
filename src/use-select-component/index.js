import React, { useState } from 'react';
import { Select } from '../select';

export const useSelectComponent = ({
    data,
    useMemo,
    useCallback
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const renderSelect = useCallback(() => (
        <Select
            data={data}
            useMemo={useMemo}
            useCallback={useCallback}
            onSelect={setSelectedOption}
            selectedOption={selectedOption}
        />
    ), [
        selectedOption,
        setSelectedOption,
        data,
        useMemo,
        useCallback
    ]);

    return useMemo(() => ([
        renderSelect,
        { selectedOption }
    ]), [
        renderSelect,
        selectedOption
    ]);
};
