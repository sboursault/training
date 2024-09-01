
export function createChild(parent, type, attributes, content) {
  const newElement = createNode(type, attributes, content)
  parent.appendChild(newElement)
  return newElement
}

export function createNode(type, attributes, content) {
  const newElement = document.createElement(type)
  if (attributes)
    for (const attrName in attributes) {
      if (attrName === 'href')
        newElement.href = attributes.href  // doesnt change anythin :(
      else
        newElement.setAttribute(attrName, attributes[attrName])
    }
  if (content && typeof content === 'string') newElement.textContent = content;
  else if (content && typeof content === 'object') newElement.appendChild(content)
  return newElement
}

export function addText(parent, text) {
  const newtext = document.createTextNode(text);
  parent.appendChild(newtext);
}