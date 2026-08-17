/** Client-safe Cloudinary URL helper (no Node.js SDK). */

export function getCloudinaryDeliveryUrl(
  url: string,
  { width = 2560, quality = 'auto:best' }: { width?: number; quality?: string } = {}
): string {
  if (!url?.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url
  }

  const [base, rest] = url.split('/upload/')
  if (!rest) return url

  // Keep only version + asset path, drop any baked-in upload transforms
  const versionMatch = rest.match(/(v\d+\/.+)$/)
  const assetPath = versionMatch ? versionMatch[1] : rest

  const transform = `w_${width},q_${quality},f_auto,c_limit,dpr_auto`
  return `${base}/upload/${transform}/${assetPath}`
}
