import { BrandArtwork, type BrandArtworkProps } from "./artwork";

export type LabLogoProps = BrandArtworkProps;

export function LabLogo(props: LabLogoProps) {
  return (
    <BrandArtwork
      lightSrc="/brand/arthurlabs-lab-logo-light.svg"
      darkSrc="/brand/arthurlabs-lab-logo-dark.svg"
      label="ArthurLabs Lab"
      defaultClassName="inline-block h-[32px] w-[139px] shrink-0"
      {...props}
    />
  );
}
