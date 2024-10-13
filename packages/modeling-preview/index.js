/**
 * usage:
 * const { union, subtract, intersect, doTransform, translate, rotate, scale } = jscadPreview(jscad)
 * @param booleans - reference to jscad module {subtract, intersect, union}
 * @returns
 */
export function jscadPreview(booleans, colorize, substractColor = [1, 1, 1, 0.5], intersectColor = [0.6, 0.6, 0.6, 0.5]) {
  // booleans with preview ability
  const withPreview = (func, alt, ...params) => (jscadPreview.enabled ? alt : func)(...params)

  /**
   * single level subtract if easy to preview, multilevel not so much.
   * The first geometry is shown transparent, and holes are left full color so you can see holes through
   * the geometry that is to be drilled. This is also handy when user miscalculates position, and holes are outside base.
   */
  const subtract = (...params) =>
    withPreview(booleans.subtract, (model, ...rest) => [...rest, colorize(substractColor, model)], ...params)

  /**
   * intersect preview is tricky, so the preview is showing all geometries half transparent
   */
  const intersect = (...params) =>
    withPreview(booleans.intersect, (...models) => colorize(intersectColor, models), ...params)

  /**
   * union is easiest to preview, as it is just enough to ignore union operation and render all parts
   */
  const union = (...params) => withPreview(booleans.union, (...models) => models, ...params)

  return {
    withPreview,
    union,
    subtract,
    intersect,
  }
}