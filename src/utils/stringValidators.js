const validateSlug = (slug) => {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateSlug };
