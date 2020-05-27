import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { Select } from '../select';

export const ComponentWithCallbacks = ({
    data,
    useMemo,
    onSelect
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        onSelect(selectedOption);
    }, [
        selectedOption,
        onSelect
    ]);

    return (
        <div>
            <div>
                Selected:
                {get(selectedOption, 'label') || 'None'}
            </div>
            <Select
                data={data}
                useMemo={useMemo}
                onSelect={setSelectedOption}
                selectedOption={selectedOption}
            />
        </div>
    );
};
