import React, { useEffect } from 'react';
import get from 'lodash/get';
import { useSelect } from '../use-select';
import { useSelectComponent } from '../use-select-component';

export const HookRendering = ({
    shouldRenderAsFunction,
    shouldUseComponent,
    data,
    useMemo,
    onSelect
}) => {
    const useHook = shouldUseComponent ? useSelectComponent : useSelect;
    const [
        renderSelect,
        { selectedOption }
    ] = useHook({
        data,
        useMemo
    });

    const Select = !shouldRenderAsFunction && renderSelect;

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
            {Select ? <Select /> : renderSelect()}
        </div>
    );
};
