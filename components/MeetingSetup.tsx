'use client';
import { useEffect, useState } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete,}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  
  // Hook calls to retrieve the start/end times of the call
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();

  // Flags for checking the meeting state
  const callTimeNotArrived = callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  // Get the current call instance
  const call = useCall();

  // Handle the error when call is not available
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  // Handle toggling the camera and microphone

  //method 1 for without event handling method use
  // useEffect(() => {
  //   if (isMicCamToggled) {
  //     call.camera.disable();
  //     call.microphone.disable();
  //   } else {
  //     call.camera.enable();
  //     call.microphone.enable();
  //   }
  // }, [isMicCamToggled, call.camera, call.microphone]);
 

  //method 2 for event handling method use
  useEffect(() => {
    const toggleDevices = async () => {
      try {
        if (isMicCamToggled) {
          await call.camera.disable();
          await call.microphone.disable();
        } else {
          await call.camera.enable();
          await call.microphone.enable();
        }
      } catch (error) {
        console.error("Error toggling camera/microphone:", error);
      }
    };

    toggleDevices();
  }, [isMicCamToggled, call]);

  // Show alert if the call hasn't started yet
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  // Show alert if the call has ended
  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          
          // Ensure the user joins the call when they click "Join Meeting"
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;