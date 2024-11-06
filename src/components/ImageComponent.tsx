import Image, { ImageProps } from "next/image";

import * as jpgs from "@/assets/images/jpgs";
import * as pngs from "@/assets/images/pngs";

type KeyJpg = keyof typeof jpgs;
type KeyPng = keyof typeof pngs;

export type ImageComponentKey = KeyJpg | KeyPng;

export type ImageComponentProps = Omit<ImageProps, "src"> & {
  image: ImageComponentKey;
};

export const ImageComponent: React.FC<ImageComponentProps> = ({
  image,
  ...props
}) => {
  const Jpg = jpgs[image as KeyJpg];
  const Png = pngs[image as KeyPng];

  const src = Jpg?.src || Png?.src || null;

  if (src) {
    return (
      <Image
        {...props}
        alt={props.alt || image}
        src={src}
        className={`image-component ${props.className || ""}`}
      />
    );
  }
  return <div></div>;
};
