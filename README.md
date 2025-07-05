This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Labbe - Event Management Platform

## Template Image Capture Feature

This feature allows users to capture the template preview (background image + text overlay) as an image that can be saved, downloaded, or sent to the backend.

### Features Available

1. **Download Template Image**: Downloads the template as a PNG file
2. **Copy to Clipboard**: Copies the template image to the system clipboard
3. **Save to Server**: Uploads the template image to the backend server
4. **Get as Base64**: Returns the template as a base64 encoded string

### How It Works

The feature uses `html2canvas` library to capture the template preview div and convert it to a canvas element, which can then be:

- Downloaded as a PNG file
- Copied to clipboard
- Sent to backend as FormData
- Converted to base64 for database storage

### Usage Example

```javascript
// In your component
import html2canvas from "html2canvas";

// Capture template as image
const captureTemplate = async () => {
  const canvas = await html2canvas(templateRef.current, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scale: 2, // Higher quality
  });

  // Convert to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invitation-template.png";
    link.click();
  }, "image/png");
};
```

### Backend API

The backend provides an endpoint to save template images:

```javascript
POST /api/auth/templates/save
Content-Type: multipart/form-data

{
  templateImage: File,
  templateData: JSON
}
```

### Frontend Integration

The template form includes action buttons:

- **Download Image**: Downloads the template as PNG
- **Copy to Clipboard**: Copies image to clipboard
- **Save to Server**: Uploads to backend

### Technical Details

- Uses `html2canvas` for DOM-to-canvas conversion
- Supports high-quality image capture (scale: 2)
- Handles CORS and tainted canvas issues
- Includes loading states and error handling
- Supports multiple output formats (PNG, base64, blob)

### Installation

```bash
npm install html2canvas
```

### Dependencies

- `html2canvas`: ^1.4.1
- `react`: ^18.x
- `next.js`: ^14.x
