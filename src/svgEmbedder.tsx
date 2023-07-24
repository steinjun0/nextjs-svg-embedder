import React from "react";

const startPath = __dirname.slice(0, __dirname.indexOf('.next'));
const kebabize = (str: string) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

export default function SvgEmbedder({ src, overrideProps, pathProps, ...props }: { src: { src: string; }, overrideProps?: React.SVGProps<SVGSVGElement>, pathProps?: React.SVGProps<SVGSVGElement>; } & React.SVGProps<SVGSVGElement>) {
    const imgPath = require('path').join(startPath, src.src.replace('_next', '.next'));
    const propsString = Object.entries(props).map(([key, value]) => `${kebabize(key)}="${value}"`).join(' ');
    let svgString = require('fs').readFileSync(imgPath).toString();

    if (pathProps) {
        const pathPropsString = Object.entries(pathProps).map(([key, value]) => `${kebabize(key)}="${value}"`).join(' ');
        svgString = svgString.replace(/<path/g, `<path ${pathPropsString}`);
    }

    if (overrideProps) {
        Object.entries(overrideProps).forEach(([key, value]) => {
            svgString = svgString.replace(new RegExp(`${kebabize(key)}=".+?"`, 'g'), `${kebabize(key)}="${value}"`);
        }
        );
    }

    svgString = svgString.replace(/<svg/g, `<svg ${propsString}`);

    return (
        <div dangerouslySetInnerHTML={{ __html: svgString }}></div>
    );
}