import range from 'lodash/range';

export const data = range(0, 100).map(i => ({
    id: `item-${i}`,
    value: i
}));
