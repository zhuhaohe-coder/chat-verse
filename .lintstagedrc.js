module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'git add'],
  '*.{json,md}': ['prettier --write', 'git add'],
};
