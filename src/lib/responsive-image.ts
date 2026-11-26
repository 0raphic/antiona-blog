import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('/public/img/**/*.{avif,jpg,jpeg,png,webp}');

export const responsiveImageQuality = 50;
// [背景定制] 首页横幅默认图；替换 public/img/site_header_{800,1200,1600,1920}.webp 时四档一起换。
export const defaultHeroImage = '/img/site_header_1920.webp';
// On tall phones every cover shows the same central portrait crop, so the banner can persist across pages.
export const portraitHeroMedia = '(max-width: 440px) and (max-aspect-ratio: 8/15)';
export const wideHeroMedia = `not all and ${portraitHeroMedia}`;
export const portraitHeroTransform = {
  width: 400,
  height: 450,
  densities: [1, 2, 3],
  fit: 'cover' as const,
  position: 'centre',
};
// [背景定制] 1920 图的真实宽度是 1920，描述符同步改成 1920w，避免浏览器按错误宽度选图。
export const defaultHeroSrcset =
  '/img/site_header_800.webp 800w, /img/site_header_1200.webp 1200w, /img/site_header_1600.webp 1600w, /img/site_header_1920.webp 1920w';

export async function resolveResponsiveImage(src: string, maxWidth = 1600) {
  const image = await images[`/public${src}`]?.();
  if (!image) return undefined;
  const width = Math.min(maxWidth, image.default.width);
  const widths = [...new Set([400, 800, 1200, width].filter((candidate) => candidate <= width))];
  return { src: image.default, width, widths };
}
