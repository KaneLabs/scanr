import { useEffect, useRef } from "react";
export * from './Barcodes'


export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
