
let string = "generate me a sales proposal about the following product: "

function generatePrompt(product) {
  return string + product;
}

export default generatePrompt