```tsx
import {useCallback, useEffect, useRef} from 'react';
import {isBrowserPermissionDenied} from '@/utils';

interface UseBrowserPermissionsOptions {
  onGranted: () => void;
  onDenied: () => void;
}

const useBrowserPermissions = ({
  onGranted,
  onDenied,
}: UseBrowserPermissionsOptions) => {
  const onGrantedRef = useRef(onGranted);
  const onDeniedRef = useRef(onDenied);

  useEffect(() => {
    onGrantedRef.current = onGranted;
  }, [onGranted]);

  useEffect(() => {
    onDeniedRef.current = onDenied;
  }, [onDenied]);

  const requestCamera = useCallback(async () => {
    try {
      const status = await navigator.permissions?.query?.({
        name: 'camera' as PermissionName,
      });
      if (status?.state === 'denied') {
        onDeniedRef.current();
        return;
      }
    } catch {
      // permissions.query('camera') is unsupported in some browsers
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      onGrantedRef.current();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: {ideal: 'environment'}},
        audio: false,
      });
      stream.getTracks().forEach(track => track.stop());
      onGrantedRef.current();
    } catch (error: unknown) {
      if (isBrowserPermissionDenied(error)) {
        onDeniedRef.current();
        return;
      }
    }
  }, []);

  return {requestCamera};
};

export {useBrowserPermissions};
```
