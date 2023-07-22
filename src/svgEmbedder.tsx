import React from "react";

const startPath = __dirname.slice(0, __dirname.indexOf('.next'));

export default function SvgEmbedder({ src, force = false, ...props }: { src: { src: string; }, force?: boolean; } & React.SVGProps<SVGSVGElement>) {
    const imgPath = require('path').join(startPath, src.src.replace('_next', '.next'));
    const propsString = Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ');
    let svgString = require('fs').readFileSync(imgPath).toString().replace(/<svg/, `<svg ${propsString}`);
    if (force) {
        Object.entries(props).forEach(([key, value]) => {
            console.log(key);
            svgString = svgString.replace(new RegExp(`${key}=".+?"`, 'g'), `${key}="${value}"`);
        }
        );
    }

    return (
        <div dangerouslySetInnerHTML={{ __html: svgString }}></div>
    );
}