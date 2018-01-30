const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

export const UUID_PATTERN =
  '[a-f0-9]{8}-?[a-f0-9]{4}-?[1-5][a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}';

export const getArray = (size = 1) => Array.from(Array(size).keys());

export const isFunction = replacementOption =>
  replacementOption.startsWith('uuid');

export const getReplacementValue = option => {
  switch (option) {
    case 'uuidv1':
      return uuidv1();
    case 'uuidv4':
      return uuidv4();
    default:
      throw new Error('Unkown replacement function');
  }
};

export const getPattern = pattern => {
  switch (pattern) {
    case 'uuid':
      return UUID_PATTERN;
    default:
      return pattern;
  }
};

const replace = (content, pattern, replacement = 'uuidv1') => {
  if (!content) {
    return 'Empty content !';
  }

  if (!isFunction(replacement)) {
    return content.replace(new RegExp(pattern, 'gi'), replacement);
  }

  const match = content.match(new RegExp(getPattern(pattern), 'gi'));
  if (!match) {
    return content;
  }
  const uniques = [...new Set(match)];

  const replacements = getArray(uniques.length).map(() =>
    getReplacementValue(replacement),
  );

  let newContent = content;
  uniques.forEach((item, idx) => {
    newContent = newContent.replace(new RegExp(item, 'gi'), replacements[idx]);
  });
  return newContent;
};

export default replace;
