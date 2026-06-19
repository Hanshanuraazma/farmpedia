"use client";

import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Create the global callback function for Google Translate
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,id,ja",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Load the Google Translate script dynamically
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-white p-2 rounded-lg shadow-2xl border border-gray-200 overflow-hidden translate-element-container">
      <div id="google_translate_element"></div>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Remove the top google translate bar */
        .skiptranslate iframe {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        /* Customize the dropdown slightly */
        .goog-te-combo {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
          outline: none;
          font-family: inherit;
        }
        /* Hide the google branding */
        .goog-logo-link {
          display:none !important;
        } 
        .goog-te-gadget {
          color: transparent !important;
        }
      `}} />
    </div>
  );
}
