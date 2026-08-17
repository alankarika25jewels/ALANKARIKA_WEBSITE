/** Parse key features from FormData (JSON array or legacy comma-separated). */
export function parseKeyFeatures(raw: string | null | undefined): string[] {
  if (!raw) return []
  const trimmed = raw.trim()
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) {
        return parsed.map(String).map(f => f.trim()).filter(Boolean)
      }
    } catch {
      // fall through to comma split
    }
  }
  return trimmed.split(',').map(f => f.trim()).filter(Boolean)
}

/** Serialize key features for FormData (JSON avoids comma-in-text bugs). */
export function serializeKeyFeatures(features: string[]): string {
  return JSON.stringify(features.map(f => f.trim()).filter(Boolean))
}

/** Normalize keyFeatures from API / list responses. */
export function normalizeKeyFeatures(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean)
  }
  if (typeof value === 'string') {
    return parseKeyFeatures(value)
  }
  return []
}
