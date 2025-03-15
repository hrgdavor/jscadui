/*
@author Davor Hrg
implementation of function for JSX tutorial https://hrgdavor.github.io/jsx6/demistify/ section: jsx2dom
Although it is meant for JSX, it can be used plainly and code it not too bad looking
*/

/** Short but pretty usable support function for JSX.
 *
 * @param {String|Function} tag
 * @param {Object} attr
 * @param  {...any} children
 * @returns {Element}
 */
export function h(tag, attr, ...children) {
  if (!tag) return children // support JSX fragment: <></>

  if (tag instanceof Function) {
    // declaring default value for attr in receiving function does not help because jsx tranformer would give us null here
    // const MyFuncComponent = ({title='',...attr}={}, children)=>....
    // so we will clean the value here  to avoid runtime errors and users need not worry
    // const MyFuncComponent = ({title='',...attr}, children)=>......
    // leaving attr == null might have some benefit in easier knowing when there were no attributes
    // but the downsides are far greater in usability for most cases
    attr = attr || {} // so the functions need not worry if attr is null
    return tag.prototype ? new tag(attr, children) : tag(attr, children)
  }

  const node = document.createElement(tag)
  if (attr) {
    for (let aName in attr) {
      const value = attr[aName]
      if (value !== false && value !== null && value !== undefined) {
        if (aName.startsWith('on') && typeof value === 'function') {
          node.addEventListener(aName.substring(2), value)
        } else {
          if (value !== false && value !== null && value !== undefined) node.setAttribute(aName, value)
        }
      }
    }
  }
  children.forEach(c => insert(node, c))
  return node
}

/** Utility function to replace usage of Node.appendChild and Node.insertBefore.
 * Supports child to also be
 *  - Array<Node>  - to streamline JSX.Fragment usage.
 *  - String - to simplify inserting text
 *
 * @param {Node} parent - parent node where child Nodes are added
 * @param {String|Node|Array<Node>} child String will be converted to TextNode, and array will cause all items to be added from the array
 * @param {Node|null} before optional Node to insert before instead the default (append)
 */
export function insert(parent, child, before) {
  if (child instanceof Array) {
    child.forEach(c => insert(parent, c))
  } else {
    if (child === null || child === undefined) return
    if (!(child instanceof Node)) {
      if (typeof child !== 'string') child += ''
      child = document.createTextNode(child)
    }
    parent.insertBefore(child, before)
  }
}

/** A common use case for this tutorial is to add elements to document.body.
 *
 * @param {Node} child
 * @returns
 */
export const addToBody = child => insert(document.body, child)

/** Common use case when we are adding content to some part of a page.
 *
 * @param {Node|String} node reference to dom node or String with css selector
 * @param {String|Node|Array<Node>} newNode
 */
export function replace(node, newNode) {
  if (typeof node === 'string') node = document.querySelector(node)
  const parentNode = node.parentNode

  if (newNode instanceof Array) {
    // first insert them in front of the node we are replacing
    insert(node.parentNode, newNode, node)
    // then just remove it
    parentNode.removeChild(node)
  } else {
    parentNode.replaceChild(newNode, node)
  }
}
