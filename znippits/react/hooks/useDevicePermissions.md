```ts
import {useCallback} from 'react';
import {isWebView, isMobileBrowser} from '@/utils';
import {useRNPermissions} from './useRNPermissions';
import {useBrowserPermissions} from './useBrowserPermissions';

interface UseDevicePermissionsOptions {
  onGranted: () => void;
  onDenied: () => void;
  onBypass: () => void;
}

export const useDevicePermissions = ({
  onGranted,
  onDenied,
  onBypass,
}: UseDevicePermissionsOptions) => {
  const {requestCamera: requestRNCamera} = useRNPermissions({
    onGranted,
    onDenied,
  });
  const {requestCamera: requestBrowserCamera} = useBrowserPermissions({
    onGranted,
    onDenied,
  });

  const requestCamera = useCallback(() => {
    if (isWebView()) {
      requestRNCamera();
    } else if (isMobileBrowser()) {
      requestBrowserCamera();
    } else {
      onBypass();
    }
  }, [onGranted, requestRNCamera, requestBrowserCamera]);

  return {requestCamera};
};
```
