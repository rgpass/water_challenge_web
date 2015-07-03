// Allow for string interpolation
// Ex: t('My name is #{name}.', { name: 'Gerry' })
// returns: 'My name is Gerry.'
function t(s, d) {
  for (var p in d)
    s = s.replace(new RegExp('#{' + p + '}', 'g'), d[p]);
  return s;
}
