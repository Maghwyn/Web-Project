import PDF from "../assets/img/pdf.svg";
import IMG from "../assets/img/img.svg";
import ZIP from "../assets/img/zip.svg";

export function fetchImages(str, array = {}) {
    const images = require.context('../assets/img', false, /\.(png|jpe?g|svg|webp)$/);
    images.keys().map((item) => ( array[item.replace('./', '')] = images(item) ));

    return array[str];
}

// Bad way to import the extension image when adding content to a class.
export function fetchExtSvg(ext, img = "") {
    if(ext === ".pdf") img = PDF;
    else if(ext === ".zip") img = ZIP;
    else img = IMG;

    return img;
}

export function capitalize(str) {
    return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}