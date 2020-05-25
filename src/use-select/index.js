import React, { useState } from 'react';
import get from 'lodash/get';
import { Options } from '../options';

export const useSelect = ({
    data,
    useMemo,
    useCallback
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = useMemo(() => data.map(({ value }) => ({
        label: `Item ${value}`,
        value
    })), [data]);

    const handleChange = useCallback(event => {
        setSelectedOption(
            options.find(({ value }) => value === +event.target.value)
        );
    }, [
        setSelectedOption,
        options
    ]);

    const renderSelect = useCallback(() => (
        <select
            value={get(selectedOption, 'value')}
            onChange={handleChange}
            data-test-id='select-component'
        >
            <Options
                options={options}
                useMemo={useMemo}
            />
        </select>
    ), [
        selectedOption,
        handleChange,
        options,
        useMemo
    ]);

    return useMemo(() => ([
        renderSelect,
        { selectedOption }
    ]), [
        renderSelect,
        selectedOption
    ]);
};
