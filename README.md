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
import vercelIcon from 'public/vercel.svg'; // should change attribute of <path>

export default function page(){
    return <div>
    <SvgEmbedder src={svgImage} fill="red" />
    
    {/* add and override path props */}
    <SvgEmbedder src={vercelIcon} pathProps={{fill:"red", fillOpacity: "50%"}}/> 
    
    {/* override existing props. fillOpacity doesn't change */}
    <SvgEmbedder src={vercelIcon} overrideProps={{fill:"red", fillOpacity: "50%"}}/> 
  </div>;
}
```
### src
Give the imported image.

### props
Use all props of `React.SVGProps<SVGSVGElement>`(`fill`, `width`, `height`,...) like common tag in `React`.
```tsx
  <SvgEmbedder src={svgImage} fill="red" fillOpacity="50%" {...originProps}/>
  {/* Same code */}
  <svg fill="red" fillOpacity="50%" {...originProps}>
    {/* path of svgImage */}
  </svg>
```

### pathProps
Set `pathProps` to set attribute of every `<path>`. This option will be useful when you can't edit original svg file. This update all `<path>` eqaully.
```tsx
  <SvgEmbedder src={svgImage} pathProps={{fill:"red", fillOpacity:"50%"}}/>
  {/* Same code */}
  <svg {...originProps}>
    <path fill="red" fillOpacity="50%" {...originProps}/>
    {/* path of svgImage */}
  </svg>
```

### overrideProps
Set `overrideProps` to override every attribute of not only every `<path>` but also `<svg>`. This option will be useful when you can't edit original svg file. This affects all `<svg>`, `<path>` equally.

## (Recommend) Edit original svg
If you can edit original svg, it helps codes become more simple.  

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
import vercelIcon from 'public/vercel.svg'; // should change attribute of <path>, <svg>

export default function page(){
    return <div>
    <SvgEmbedder src={vercelIcon} pathProps={{fill:"red"}} />
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
    <SvgEmbedder src={vercelIcon} fill="red" /> {/* <- just props(no pathProps) */}
  </div>;
}
```
### result
![result_image](README/result.png)

## ⚠️ Caution
This is only works in **Server Side** because it should use server builtin functions and insert new html while redering. If you want to control svg in client side, consider [@svgr/webpack](https://react-svgr.com/docs/next/). 