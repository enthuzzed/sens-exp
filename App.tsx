import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Topic, RecordingState } from './src/types';
import CameraView from './src/components/CameraView';

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
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Text style={styles.sectionTitle}>Select topic</Text>
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
    </ScrollView>
  );
}

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [videoUri, setVideoUri] = useState<string | null>(null);

  const handleRecordingComplete = (uri: string) => {
    setVideoUri(uri);
    setRecordingState('preview');
  };

  const renderContent = () => {
    if (recordingState === 'preview' && videoUri) {
      return (
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Recording Preview</Text>
          <Text style={styles.text}>Video recorded: {videoUri}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRecordingState('idle');
              setVideoUri(null);
              setSelectedTopic(null);
            }}
          >
            <Text style={styles.buttonText}>Record Another</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (selectedTopic) {
      return (
        <CameraView
          topic={selectedTopic}
          onRecordingComplete={handleRecordingComplete}
          onBack={() => setSelectedTopic(null)}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>sensusAI</Text>
          <Text style={styles.balance}>100 $SENS</Text>
        </View>
        <TopicSelector onSelect={setSelectedTopic} />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="auto" />
        {renderContent()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
    color: '#000',
  },
  balance: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
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
    marginHorizontal: 16,
  },
  subTopicButton: {
    marginLeft: 32,
  },
  topicButtonText: {
    fontSize: 16,
    color: '#000',
  },
});