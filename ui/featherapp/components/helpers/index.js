export const displayPrice = (price) => {
  return price / 100;
}

export const internalizePrice = (field_value) => {
  return Math.trunc(parseFloat(field_value).toFixed(2)*100)
}

export const isFloat = (val) => {
  if (val === "") {
    return true;
  }
  var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(val))
      return false;

  val = parseFloat(val);
  if (isNaN(val))
      return false;
  return true;
}