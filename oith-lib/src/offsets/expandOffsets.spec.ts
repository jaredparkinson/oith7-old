import { expandOffsets } from './expandOffsets';

test('Test if offsets are expanded correctly', async () => {
  expect(await expandOffsets({ offsets: '1-10' }).toPromise()).toEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);
  expect(await expandOffsets({ offsets: '1-10,90-100 ' }).toPromise()).toEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
  ]);
});
