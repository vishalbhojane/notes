```ts
import {isWebView} from '@/utils';
import {useCallback, useEffect, useRef} from 'react';

export const WEBVIEW_MESSAGE_TYPES = {
  REQUEST_CAMERA: 'REQUEST_CAMERA',
  RN_CAMERA_RESPONSE: 'RN_CAMERA_RESPONSE',
} as const;

const WEBVIEW_CAMERA_REQUEST_TIMEOUT_MS = 30000;

interface UseRNPermissionsOptions {
  onGranted: () => void;
  onDenied?: () => void;
}

export const useRNPermissions = ({
  onGranted,
  onDenied,
}: UseRNPermissionsOptions) => {
  const isRequestPending = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onGrantedRef = useRef(onGranted);
  const onDeniedRef = useRef(onDenied);

  useEffect(() => {
    onGrantedRef.current = onGranted;
  }, [onGranted]);

  useEffect(() => {
    onDeniedRef.current = onDenied;
  }, [onDenied]);

  const clearRequestTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const requestCamera = useCallback(() => {
    if (isWebView()) {
      if (isRequestPending.current) return;

      isRequestPending.current = true;
      clearRequestTimeout();
      timeoutRef.current = setTimeout(() => {
        if (!isRequestPending.current) return;
        isRequestPending.current = false;
        timeoutRef.current = null;
        console.error('Camera permission request timed out');
        onDeniedRef.current?.();
      }, WEBVIEW_CAMERA_REQUEST_TIMEOUT_MS);

      window.ReactNativeWebView?.postMessage(
        JSON.stringify({type: WEBVIEW_MESSAGE_TYPES.REQUEST_CAMERA})
      );
    } else {
      onGrantedRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (!isWebView()) return;

    const onResponse = (e: MessageEvent) => {
      if (!isRequestPending.current) return;
      isRequestPending.current = false;
      clearRequestTimeout();

      const payload = e.data;

      if (payload?.type === WEBVIEW_MESSAGE_TYPES.RN_CAMERA_RESPONSE) {
        const {granted} = payload.payload || {};
        if (granted) {
          onGrantedRef.current?.();
        } else {
          console.error('Camera permission denied');
          onDeniedRef.current?.();
        }
      }
    };

    const eventType = WEBVIEW_MESSAGE_TYPES.RN_CAMERA_RESPONSE;
    window.addEventListener(eventType, onResponse as EventListener);

    return () => {
      window.removeEventListener(eventType, onResponse as EventListener);
      clearRequestTimeout();
      isRequestPending.current = false;
    };
  }, []);

  return {requestCamera};
};
```
