function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    let dataURL = canvas.toDataURL();
    return dataURL;
}

export const myImage = async (img) => {
    let image = new Image();
    image.src = img;
    let base64
    setTimeout(() => {
        base64 = getBase64Image(image)
    })
    return base64
}
