import { formatValue, gearValue, itemValue, parseValue } from '@/lib/itemValue';

describe('item values', () => {
    it('reads values in any coin, with commas, decimals and several parts', () => {
        expect(parseValue('50 gp')).toBe(5000);
        expect(parseValue('1,200 GP')).toBe(120000);
        expect(parseValue('2.5 gp')).toBe(250);
        expect(parseValue('1 gp 5 sp')).toBe(150);
        expect(parseValue('3 platinum')).toBe(3000);
        expect(parseValue('priceless')).toBeNull();
        expect(parseValue(undefined)).toBeNull();
    });

    it('formats copper as gold, silver and copper', () => {
        expect(formatValue(120000)).toBe('1,200 gp');
        expect(formatValue(1250)).toBe('12 gp 5 sp');
        expect(formatValue(7)).toBe('7 cp');
        expect(formatValue(0)).toBe('0 gp');
    });

    it("uses the item's own value, not the item list's cost", () => {
        expect(itemValue({ value: ' 50 gp ' })).toBe('50 gp');
        expect(itemValue({ value: '' })).toBeUndefined();
        expect(itemValue({})).toBeUndefined();
    });

    it('totals values times quantity', () => {
        expect(gearValue([
            'Rope',
            { name: 'Ruby', value: '1,000 gp' },
            { name: 'Silver Ring', value: '25 gp', quantity: 2 },
            { name: 'Arrows', cost: '1 GP', quantity: 20 },
            { name: 'Odd Coin', value: 'priceless' },
        ])).toEqual({ copper: 105000, counted: 2 });
    });
});
