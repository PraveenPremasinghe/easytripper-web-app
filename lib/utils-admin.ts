// Utility functions for admin pages

// Generate unique ID
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

// Generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

// Convert file to URL (for preview)
export function fileToURL(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Convert image file to WebP format (base64)
 * WebP provides better compression (30-50% smaller) while maintaining quality
 * @param file - Image file to convert
 * @param quality - WebP quality (0-1), default 0.85 (85%)
 * @param maxWidth - Maximum width in pixels, maintains aspect ratio
 * @param maxHeight - Maximum height in pixels, maintains aspect ratio
 * @returns Promise<string> - Base64 encoded WebP image
 */
export function fileToWebP(
  file: File,
  quality: number = 0.85,
  maxWidth?: number,
  maxHeight?: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check if WebP is supported
    if (!HTMLCanvasElement.prototype.toBlob) {
      // Fallback to base64 if WebP not supported (very rare)
      console.warn('WebP conversion not supported, using original format');
      fileToBase64(file).then(resolve).catch(reject);
      return;
    }

    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      try {
        // Calculate dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and convert to WebP
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to convert image to WebP'));
              return;
            }

            // Convert blob to base64
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result as string;
              // Log compression info
              const originalSize = file.size;
              const newSize = blob.size;
              const compression = ((1 - newSize / originalSize) * 100).toFixed(1);
              console.log(
                `Image converted to WebP: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${compression}% smaller)`
              );
              resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          'image/webp',
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
