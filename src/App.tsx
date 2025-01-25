import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Video } from 'lucide-react';
import { Topic, RecordingState } from './types';

const topics: Topic[] = [
  {
    id: 'indoor',
    name: 'Indoor',
  },
  {
    id: 'outdoor',
    name: 'Outdoor',
    subcategories: [
      { id: 'household', name: 'Household' },
      { id: 'office', name: 'Office/Workspace' },
      { id: 'retail', name: 'Retail & Commercial' },
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation/Navigation'
  },
  {
    id: 'specialized',
    name: 'Specialized Tasks'
  }
];

function TopicSelector({ onSelect }: { onSelect: (topic: Topic) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select topic</Text>
      {topics.map((topic) => (
        <View key={topic.id}>
          <TouchableOpacity
            style={styles.topicButton}
            onPress={() => onSelect(topic)}
          >
            <Text style={styles.topicButtonText}>{topic.name}</Text>
          </TouchableOpacity>
          {topic.subcategories?.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              style={[styles.topicButton, styles.subTopicButton]}
              onPress={() => onSelect(sub)}
            >
              <Text style={styles.topicButtonText}>{sub.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

function RecordingView({ topic, onBack }: { topic: Topic; onBack: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{topic.name}</Text>
      </View>
      
      <View style={styles.previewContainer}>
        <Camera size={48} />
        <Text style={styles.previewText}>Camera Preview</Text>
      </View>
      
      <TouchableOpacity style={styles.recordButton}>
        <Video size={24} />
        <Text style={styles.buttonText}>Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>sensusAI</Text>
        <Text style={styles.balance}>100 $SENS</Text>
      </View>

      {!selectedTopic ? (
        <TopicSelector onSelect={setSelectedTopic} />
      ) : (
        <RecordingView 
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: 800,
    marginHorizontal: 'auto',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  balance: {
    fontSize: 16,
    fontWeight: '500',
  },
  topicButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginVertical: 4,
  },
  subTopicButton: {
    marginLeft: 32,
  },
  topicButtonText: {
    fontSize: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  previewText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6b7280',
  },
  recordButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});