import { useEffect } from 'react';

function TawkToWidget() {
  useEffect(() => {
    // Initialize Tawk.to API and load start time
    const Tawk_API = Tawk_API || {};
    const Tawk_LoadStart = new Date();

    // Create the script element
    const tawkScript = document.createElement('script');
    tawkScript.async = true;
    tawkScript.src = 'https://embed.tawk.to/66b712170cca4f8a7a74284d/1i4thtblv';
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');

    // Insert the script before the first script tag in the document
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tawkScript, firstScriptTag);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything directly
}

export default TawkToWidget;
