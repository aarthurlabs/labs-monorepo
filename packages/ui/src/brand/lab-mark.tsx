import { BrandArtwork, type BrandArtworkProps } from './artwork'

export type LabMarkProps = BrandArtworkProps

export function LabMark(props: LabMarkProps) {
    return (
        <BrandArtwork
            lightSrc="/brand/lab-mark-light.svg"
            darkSrc="/brand/lab-mark-dark.svg"
            label="Símbolo ArthurLabs Lab"
            defaultClassName="inline-block h-[24px] w-[22px] shrink-0"
            {...props}
        />
    )
}
