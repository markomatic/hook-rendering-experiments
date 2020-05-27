import React, { useState } from 'react';
import { Select } from '../select';

export const useSelectComponent = ({
    data,
    useMemo
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const renderSelect = () => (
        <Select
            data={data}
            useMemo={useMemo}
            onSelect={setSelectedOption}
            selectedOption={selectedOption}
        />
    );

    return [
        renderSelect,
        { selectedOption }
    ];
};
