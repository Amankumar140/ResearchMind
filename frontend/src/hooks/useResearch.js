import { useState, useEffect, useRef } from 'react';
import { startResearch, getResearchStatus } from '../services/api';

export function useResearch() {
  const [taskId, setTaskId] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pollingRef = useRef(null);

  const triggerResearch = async (topic) => {
    setLoading(true);
    setError(null);
    setTaskData(null);
    try {
      const res = await startResearch(topic);
      setTaskId(res.id);
      setTaskData({
        id: res.id,
        topic,
        status: 'searching',
        current_step: 1,
        step_name: 'Searching Web',
      });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to initiate research task.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!taskId) return;

    const pollStatus = async () => {
      try {
        const data = await getResearchStatus(taskId);
        setTaskData(data);

        if (data.status === 'completed' || data.status === 'failed') {
          setLoading(false);
          if (pollingRef.current) clearInterval(pollingRef.current);
          if (data.status === 'failed') {
            setError(data.error || 'Research task failed.');
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    // Poll immediately, then every 2000ms
    pollStatus();
    pollingRef.current = setInterval(pollStatus, 2000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [taskId]);

  const resetResearch = () => {
    setTaskId(null);
    setTaskData(null);
    setLoading(false);
    setError(null);
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  return {
    taskId,
    taskData,
    loading,
    error,
    triggerResearch,
    resetResearch,
  };
}
