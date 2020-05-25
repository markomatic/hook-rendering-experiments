import React, { useState, useMemo, useCallback } from 'react';
import range from 'lodash/range';
import { ComponentWithCallbacks } from '../component-with-callbacks';
import { HookRendering } from '../hook-rendering';
import { data } from './data';

const components = [
    ComponentWithCallbacks,
    HookRendering
];

const styles = {
    configurationPanel: {
        padding: '10px',
        borderBottom: '1px solid black'
    },
    useMemoSelector: {
        marginLeft: '10px'
    },
    shouldRenderAsFunctionSelector: {
        marginLeft: '10px'
    },
    shouldUseComponentSelector: {
        marginLeft: '10px'
    },
    contentPanel: {
        padding: '10px'
    }
};

const useMemoDummy = fn => fn();

const useCallbackDummy = fn => fn;

const useContent = ({
    Component,
    componentKey,
    shouldRenderAsFunction,
    shouldUseComponent,
    data,
    useMemoImpl,
    useCallbackImpl,
    handleSelectedOptionChange,
    isOptimized
}) => (isOptimized ? useMemo : useMemoDummy)(() => Component && (
    range(1, 20).map(index => (
        <Component
            key={`${componentKey}-${index}`}
            shouldRenderAsFunction={shouldRenderAsFunction}
            shouldUseComponent={shouldUseComponent}
            data={data}
            useMemo={useMemoImpl}
            useCallback={useCallbackImpl}
            onSelect={handleSelectedOptionChange}
        />
    ))
), [
    Component,
    componentKey,
    shouldRenderAsFunction,
    shouldUseComponent,
    data,
    useMemoImpl,
    useCallbackImpl,
    handleSelectedOptionChange
]);

export const App = () => {
    const [renderMethod, setRenderMethod] = useState();
    const [shouldUseMemo, setShouldUseMemo] = useState(true);
    const [shouldRenderAsFunction, setShouldRenderAsFunction] = useState(true);
    const [shouldUseComponent, setShouldUseComponent] = useState(true);
    const [, setSelectedOption] = useState();

    const handleSelectedOptionChange = useCallback(option => {
        setSelectedOption(option);
    }, [setSelectedOption]);

    const handleRenderMethodChange = useCallback(event => {
        setRenderMethod(Number.isNaN(+event.target.value) ? undefined : +event.target.value);
    }, [setRenderMethod]);

    const useMemoImpl = useMemo(
        () => shouldUseMemo ? useMemo : useMemoDummy,
        [shouldUseMemo]
    );

    const useCallbackImpl = useMemo(
        () => shouldUseMemo ? useCallback : useCallbackDummy,
        [shouldUseMemo]
    );

    const handleUseMemoCheckChange = useCallback(
        event => setShouldUseMemo(event.target.checked),
        [setShouldUseMemo]
    );

    const handleShouldRenderAsFunctionChange = useCallback(
        event => setShouldRenderAsFunction(event.target.checked),
        [setShouldRenderAsFunction]
    );

    const handleShouldUseComponentChange = useCallback(
        event => setShouldUseComponent(event.target.checked),
        [setShouldUseComponent]
    );

    const Component = components[renderMethod] || null;

    const componentKey = `${
        shouldUseMemo ?
            'memo' :
            'no-memo'
    }${
        renderMethod === 1 ?
            shouldRenderAsFunction ?
                '-as-function' :
                '-not-as-function' :
            ''
    }${
        renderMethod === 1 ?
            shouldUseComponent ?
                '-import-select' :
                '-fat-hook' :
            ''
    }`;

    const content = useContent({
        Component,
        componentKey,
        shouldRenderAsFunction,
        shouldUseComponent,
        data,
        useMemoImpl,
        useCallbackImpl,
        handleSelectedOptionChange,
        isOptimized: false
    });

    return (
        <div>
            <div style={styles.configurationPanel}>
                <select
                    value={renderMethod}
                    onChange={handleRenderMethodChange}
                    data-test-id='select-render-method'
                >
                    <option>
                        Select render method
                    </option>
                    <option value={0}>
                        Component with callbacks
                    </option>
                    <option value={1}>
                        Hook rendering
                    </option>
                </select>
                <label style={styles.useMemoSelector}>
                    <input
                        type='checkbox'
                        checked={shouldUseMemo}
                        onChange={handleUseMemoCheckChange}
                        data-test-id='checkbox-should-use-memo'
                    />
                    <span>useMemo</span>
                </label>
                {renderMethod === 1 && (
                    <label style={styles.shouldRenderAsFunctionSelector}>
                        <input
                            type='checkbox'
                            checked={shouldRenderAsFunction}
                            onChange={handleShouldRenderAsFunctionChange}
                            data-test-id='checkbox-should-render-as-function'
                        />
                        <span>Render as function</span>
                    </label>
                )}
                {renderMethod === 1 && (
                    <label style={styles.shouldUseComponentSelector}>
                        <input
                            type='checkbox'
                            checked={shouldUseComponent}
                            onChange={handleShouldUseComponentChange}
                        />
                        <span>Use select component</span>
                    </label>
                )}
            </div>
            <div style={styles.contentPanel}>
                {content}
            </div>
        </div>
    );
};
