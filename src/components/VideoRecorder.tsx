import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Topic, RecordingState } from '../types';
import { Play, Square, Video } from 'lucide-react';

interface VideoRecorderProps {
  topic: Topic;
  onRecorded: (blob: Blob) => void;
  recordingState: RecordingState;
  setRecordingState: (state: RecordingState) => void;
}

function VideoRecorder({ 
  topic, 
  onRecorded,
  recordingState,
  setRecordingState 
}: VideoRecorderProps) {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleStartRecording = useCallback(() => {
    chunksRef.current = [];
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        onRecorded(blob);
      };
      mediaRecorderRef.current.start();
      setRecordingState('recording');
    }
  }, [setRecordingState, onRecorded]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Recording: {topic.name}</h2>
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Webcam
          ref={webcamRef}
          audio
          muted
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center gap-4">
        {recordingState === 'idle' ? (
          <button
            onClick={handleStartRecording}
            className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <Play size={20} />
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            <Square size={20} />
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
}

export default VideoRecorder;