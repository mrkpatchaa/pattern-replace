const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const getArray = size => Array.from(Array(size).keys());

const isFunction = replacementOption => replacementOption.startsWith('uuid');

const getReplacementValue = option => {
  switch (option) {
    case 'uuidv1':
      return uuidv1();
    case 'uuidv4':
      return uuidv4();
    default:
      throw new Error('Unkown replacement function');
  }
};

const replace = (content, pattern, replacement = 'uuidv1') => {
  if (!content) {
    return 'Empty content !';
  }

  if (!isFunction(replacement)) {
    return content.replace(new RegExp(pattern, 'gi'), replacement);
  }

  const match = content.match(new RegExp(pattern, 'gi'));
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
