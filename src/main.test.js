import replace, {
  getArray,
  getPattern,
  getReplacementValue,
  isFunction,
  UUID_PATTERN,
} from './main';

describe('getArray', () => {
  test('Returns an array of n elements, defaults to 1', () => {
    expect(getArray().length).toEqual(1);
    expect(getArray(5).length).toEqual(5);
  });
});

describe('isFunction', () => {
  test('Returns true if option starts with `uuid`', () => {
    expect(isFunction('uuidv1')).toBeTruthy();
  });

  test('Returns false if option does not start with `uuid`', () => {
    expect(isFunction('uudv1')).toBeFalsy();
  });
});

describe('Replacement value', () => {
  const uuidRegex = new RegExp(UUID_PATTERN, 'gi');
  test('Returns an uuid (v1 or v4) value', () => {
    expect(uuidRegex.test(getReplacementValue('uuidv1'))).toBeTruthy();
    uuidRegex.lastIndex = 0;
    expect(uuidRegex.test(getReplacementValue('uuidv4'))).toBeTruthy();
  });

  test('Throws an error when option is not recognized', () => {
    expect(() => getReplacementValue()).toThrowError(
      'Unkown replacement function',
    );
  });
});

describe('getPattern', () => {
  test('Returns uuid pattern', () => {
    expect(getPattern('uuid')).toEqual(UUID_PATTERN);
  });

  test('Returns pattern as it', () => {
    expect(getPattern('uuidVX')).toEqual('uuidVX');
  });
});

describe('Replace', () => {
  const uuidRegex = new RegExp(UUID_PATTERN, 'gi');
  test('Returns empty content', () => {
    expect(replace()).toEqual('Empty content !');
  });

  test('Replaces pattern with replacement value (not function)', () => {
    const content =
      'f2ac66da-04cc-11e8-ba89-0ed5f89f718b ' +
      'text ' +
      'ab003a6c-f28c-4011-8224-ae195954b644';
    const expectedResult = 'some text text some text';
    expect(replace(content, uuidRegex, 'some text')).toEqual(expectedResult);
  });

  test('Replace with function : Returns same content when no math found', () => {
    const content = '1234567';
    expect(replace(content, uuidRegex, 'uuidv1')).toEqual(content);
  });

  test('Replace with function : Replaces matches in the content', () => {
    const content =
      'f2ac66da-04cc-11e8-ba89-0ed5f89f718b ' +
      'text ' +
      'ab003a6c-f28c-4011-8224-ae195954b644';
    expect(
      replace(content, uuidRegex, 'uuidv1').match(uuidRegex).length,
    ).toEqual(2);
    expect(
      /f2ac66da-04cc-11e8-ba89-0ed5f89f718b/gi.test(
        getReplacementValue('uuidv4'),
      ),
    ).toBeFalsy();
    expect(
      /ab003a6c-f28c-4011-8224-ae195954b644/gi.test(
        getReplacementValue('uuidv4'),
      ),
    ).toBeFalsy();
  });
});
