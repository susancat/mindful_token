console.log("gallery preview")
const modelViewerTexture = document.querySelector("model-viewer#previewModel");
const previewImg = document.getElementById('previewImg');

modelViewerTexture.addEventListener("load", () => {
  let material = modelViewerTexture.model.materials[0];
  let newTexture = async (imageSource) => {
    return await modelViewerTexture.createTexture(imageSource)
  }
  let initTexture = async (attr, channel, imageSource) => {
    const texture = await newTexture(imageSource);
    material[attr][channel].setTexture(texture);
  }
  let source = window.localStorage.canvas;
  initTexture('pbrMetallicRoughness', 'baseColorTexture', source);      
});
  