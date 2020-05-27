import React from 'react';
import get from 'lodash/get';
import { Options } from '../options';

export const Select = ({
    data,
    selectedOption,
    onSelect,
    useMemo
}) => {
    const options = useMemo(() => data.map(({ value }) => ({
        label: `Item ${value}`,
        value
    })), [data]);

    const handleChange = event => {
        onSelect(
            options.find(({ value }) => value === +event.target.value)
        );
    };

    return (
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
    );
};
