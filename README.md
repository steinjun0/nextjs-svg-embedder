# Next.js SVG Embedder
A library to handle SVG as a `<svg>` tag not an `<img>` tag in Server Side Rendering.
## Motivation
When using `<Image>` of `next/image` for svg image, we can't control `svg` attribute because it rendered with `<img>` tag. Commonly we use [@svgr/webpack](https://react-svgr.com/docs/next/). Therefore, it increase build time with additional operation in `webpack`. Even there is few svg images.  

Thanks to Next.js v13 `app router`, we can use server component comfortably which fully using server side functions.  

`nextjs-svg-embedder` embed svg images with `<svg>` tags in redering time easily.

## How to use
```tsx
import SvgEmbedder from '@steinjun0/nextjs-svg-embedder';
import svgImage from 'path/of/svg/image.svg'; // only change attribute of <svg>
import vercelIcon from 'public/vercel.svg'; // should change every attribute of <path>, <svg>

export default function page(){
    return <div>
    <SvgEmbedder src={svgImage} fill="red" />
    <SvgEmbedder src={vercelIcon} fill="red" override={true} />
  </div>;
}
```
### src
Give the imported image.

### override
If you want to override every attribute of not only `<svg>` but also `<path>`, set `override={true}`. This option will be useful when you can't edit original svg file. 
Because this affects all `<svg>`, `<path>`, consider edit svg files.

### props
You can use all props of `React.SVGProps<SVGSVGElement>`(`fill`, `width`, `height`,...)

## (Recommend) Edit original svg
Here is vercel.svg which is in Next.js default project.  
```svg
<svg width="283" height="64" viewBox="0 0 283 64" fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 ... " fill="#000"/>
</svg>
```
There is `fill="#000"` in `<path>`, we should use `override` option.
```tsx
import SvgEmbedder from '@steinjun0/nextjs-svg-embedder';
import vercelIcon from 'public/vercel.svg'; // should change every attribute of <path>, <svg>

export default function page(){
    return <div>
    <SvgEmbedder src={vercelIcon} fill="red" override={true} />
  </div>;
}
```

So, when remove `fill` in `<path>`, we don't need to use `override` option.

```svg
<svg width="283" height="64" viewBox="0 0 283 64" fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 ... "/>
</svg>
```
```tsx
import SvgEmbedder from '@steinjun0/nextjs-svg-embedder';
import vercelIcon from 'public/vercel.svg'; // no fill in path

export default function page(){
    return <div>
    <SvgEmbedder src={vercelIcon} fill="red" /> {/* <- do not use override */}
  </div>;
}
```
### result
![result_image](README/result.png)

## Caution
This is only works in **Server Side** because it should use server builtin functions. If you want to control svg in client side, consider [@svgr/webpack](https://react-svgr.com/docs/next/). 