import React, { useEffect, useRef, useState } from "react";

export default function BarcodeScanner({
  onScan,
  onClose,
  autoFocus = true,
}) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const code = value.trim();

    if (!code) return;

    setScanning(true);

    Promise.resolve(onScan?.(code)).finally(() => {
      setValue("");
      setScanning(false);
      inputRef.current?.focus();
    });
  };

  return (
    <div className="barcode-scanner">
      <div className="barcode-scanner__header">
        <div>
          <span className="page-header__eyebrow">Inventory</span>
          <h3>Scan Barcode / QR Code</h3>
          <p>
            Scan an item to view stock, location and transaction history.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="barcode-scanner__form">
        <div className="barcode-scanner__visual">
          <div className="barcode-scanner__frame">
            <span />
          </div>
        </div>

        <div className="barcode-scanner__input">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Scan or enter barcode..."
            autoComplete="off"
            aria-label="Barcode"
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!value.trim() || scanning}
          >
            {scanning ? "Scanning..." : "Scan"}
          </button>
        </div>
      </form>
    </div>
  );
}