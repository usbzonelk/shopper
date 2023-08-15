const validateSlug = (slug) => {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return true;
  } else {
    return false;
  }
};

const validateMail = (mail) => {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
    return true;
  } else {
    return false;
  }
};
module.exports = { validateSlug, validateMail };
