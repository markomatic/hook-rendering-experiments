import React from 'react';

export const Options = ({
    options,
    useMemo
}) => useMemo(() => options.map(({ value, label }) => (
    <option
        key={`${value}`}
        value={value}
    >
        {label}
    </option>
)), [options]);
