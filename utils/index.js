export function validateStep({ schema, fields, watch, setError }) {
  const formValues = watch();
  let valuesToValidate;
  let pickedSchema = schema;

  if (fields) {
    const fieldList = Array.isArray(fields) ? fields : [fields];
    valuesToValidate = {};
    fieldList.forEach((fieldPath) => {
      const value = fieldPath
        .split('.')
        .reduce((obj, key) => (obj ? obj[key] : undefined), formValues);
      valuesToValidate[fieldPath] = value;
    });
    pickedSchema = schema.pick(
      fieldList.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {})
    );
  } else {
    valuesToValidate = formValues;
  }

  const result = pickedSchema.safeParse(valuesToValidate);
  if (!result.success) {
    result.error.errors.forEach((err) => {
      setError(
        err.path.join('.'),
        { type: 'manual', message: err.message },
        { shouldFocus: true }
      );
    });
    return false;
  }
  return true;
}

export function createStepHandler({ schema, fields, watch, setError }) {
  return function (e) {
    e.preventDefault();
    validateStep({
      schema,
      fields,
      watch,
      setError,
    });
  };
}

export function setNestedValue(obj, path, value) {
  let curr = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!curr[path[i]]) curr[path[i]] = {};
    curr = curr[path[i]];
  }
  curr[path[path.length - 1]] = value;
}
