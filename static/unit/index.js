function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    return canvas.toDataURL();
}

export const myImage = img => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = img;

        image.onload = function() {
            console.dir(image);
            if (image.complete) {
                let base64;
                base64 = getBase64Image(image);
                console.log(base64);
                resolve(base64)
            } else {
                reject(err)
            }

        }
    });
};
