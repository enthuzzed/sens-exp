import React from 'react';
import { Topic } from '../types';

interface TopicSelectorProps {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

function TopicSelector({ topics, onSelect }: TopicSelectorProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Select topic</h2>
      <div className="space-y-2">
        {topics.map((topic) => (
          <div key={topic.id}>
            <button
              onClick={() => onSelect(topic)}
              className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              {topic.name}
            </button>
            {topic.subcategories && (
              <div className="ml-4 mt-2 space-y-2">
                {topic.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onSelect(sub)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicSelector;