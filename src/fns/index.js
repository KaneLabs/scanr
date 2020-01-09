import { isWebUri } from 'valid-url';
import parseUrl from 'parse-url';

export const scanDataIsDuplicate = scanData => prevBarcodes => {
  const index = prevBarcodes.findIndex(barcode => barcode.uri === scanData);
  return index !== -1;
};

export const scanDataIsNotWebUri = scanData =>
  isWebUri(scanData) ? false : true;

// good to standardize timestamping creation
// https://stackoverflow.com/questions/14255664/new-date-is-this-good-practice
export const now = () => new Date().getTime();

const domainRegEx = new RegExp(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
const parseDomain = uri => {
  const matches = uri.match(domainRegEx);
  return matches && matches[1];
};

export const formatScanDataToBarcode = scanData => {
  const domain = parseDomain(scanData);
  const barcode = { domain, uri: scanData, scannedAt: now() };
  return barcode;
};

export const scanDataToNextBarcodes = scanData => prevBarcodes => {
  const isNotWebUri = scanDataIsNotWebUri(scanData);
  const isDuplicate = scanDataIsDuplicate(scanData)(prevBarcodes);
  if (isNotWebUri || isDuplicate) {
    return prevBarcodes;
  }

  const formattedBarcode = formatScanDataToBarcode(scanData);
  return [...prevBarcodes, formattedBarcode];
};

export const filterBarcode = nextBarcode => prevBarcodes =>
  prevBarcodes.filter(barcode => nextBarcode.uri !== barcode.uri);
