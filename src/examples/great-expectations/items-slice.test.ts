import reducer, {
  add,
  remove,
  toggle,
  markAllAsUnpacked,
  update,
} from './items-slice';

it('returns an empty array as the initial state', () => {
  expect(reducer(undefined, { type: 'noop' })).toEqual([]);
});

it('supports adding an item with the correct name', () => {
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result[0].name).toBe('iPhone');
});

it('prefixes ids with "item-"', () => {
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result[0].id.startsWith('item-')).toBe(true);
});

it('defaults new items to a packed status of false', () => {
  const result = reducer([], add({ name: 'iPhone' }));

  expect(result[0].packed).toBe(false);
});

it('supports removing an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, remove({ id: '1' }));

  expect(result).toEqual([]);
});

it('supports toggling an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, toggle({ id: '1' }));

  expect(result[0].packed).toBe(true);
});

it('supports updating an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(
    state,
    update({ id: '1', name: 'Samsung Galaxy S23' }),
  );

  expect(result[0].name).toBe('Samsung Galaxy S23');
});

it('supports marking all items as unpacked', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: true,
    },
  ];

  const result = reducer(state, markAllAsUnpacked());

  result.forEach((item) => {
    expect(item.packed).toEqual(false);
  });
});
