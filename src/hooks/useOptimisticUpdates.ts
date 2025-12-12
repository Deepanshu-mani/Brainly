import { useState, useCallback } from "react";
import { showToast } from "../utils/toast";
import type { Content } from "../types/content";

interface OptimisticUpdateOptions<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useOptimisticUpdates<T>() {
  const [optimisticStates, setOptimisticStates] = useState<Map<string, T>>(
    new Map(),
  );
  const [pendingOperations, setPendingOperations] = useState<Set<string>>(
    new Set(),
  );

  const executeOptimisticUpdate = useCallback(
    async (
      id: string,
      optimisticValue: T,
      operation: () => Promise<T>,
      options: OptimisticUpdateOptions<T> = {},
    ) => {
      const { onSuccess, onError, successMessage, errorMessage } = options;

      // Set optimistic state immediately
      setOptimisticStates((prev) => new Map(prev).set(id, optimisticValue));
      setPendingOperations((prev) => new Set(prev).add(id));

      try {
        const result = await operation();

        // Success - remove optimistic state and pending operation
        setOptimisticStates((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

        onSuccess?.(result);
        if (successMessage) {
          showToast.success(successMessage);
        }

        return result;
      } catch (error) {
        // Error - remove optimistic state and pending operation
        setOptimisticStates((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
        setPendingOperations((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

        onError?.(error);
        if (errorMessage) {
          showToast.error(errorMessage);
        }

        throw error;
      }
    },
    [],
  );

  const getOptimisticValue = useCallback(
    (id: string, fallback: T): T => {
      return optimisticStates.get(id) || fallback;
    },
    [optimisticStates],
  );

  const isPending = useCallback(
    (id: string): boolean => {
      return pendingOperations.has(id);
    },
    [pendingOperations],
  );

  const clearOptimisticState = useCallback((id: string) => {
    setOptimisticStates((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
    setPendingOperations((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  return {
    executeOptimisticUpdate,
    getOptimisticValue,
    isPending,
    clearOptimisticState,
    hasOptimisticStates: optimisticStates.size > 0,
    hasPendingOperations: pendingOperations.size > 0,
  };
}

// Hook for content operations
export function useOptimisticContent() {
  const optimisticUpdates = useOptimisticUpdates();

  const optimisticDelete = useCallback(
    async (
      contentId: string,
      deleteOperation: () => Promise<void>,
      onSuccess?: () => void,
    ) => {
      return optimisticUpdates.executeOptimisticUpdate(
        contentId,
        { _id: contentId, deleted: true } as unknown as Content, // Optimistic deleted state cast safely
        deleteOperation,
        {
          successMessage: "Content deleted successfully",
          errorMessage: "Failed to delete content. Please try again.",
          onSuccess,
        },
      );
    },
    [optimisticUpdates],
  );

  const optimisticUpdate = useCallback(
    async (
      contentId: string,
      optimisticContent: unknown,
      updateOperation: () => Promise<unknown>,
      onSuccess?: (result: unknown) => void,
    ) => {
      return optimisticUpdates.executeOptimisticUpdate(
        contentId,
        optimisticContent,
        updateOperation,
        {
          successMessage: "Content updated successfully",
          errorMessage: "Failed to update content. Please try again.",
          onSuccess,
        },
      );
    },
    [optimisticUpdates],
  );

  const optimisticCreate = useCallback(
    async (
      tempId: string,
      optimisticContent: unknown,
      createOperation: () => Promise<unknown>,
      onSuccess?: (result: unknown) => void,
    ) => {
      return optimisticUpdates.executeOptimisticUpdate(
        tempId,
        optimisticContent,
        createOperation,
        {
          successMessage: "Content added successfully",
          errorMessage: "Failed to add content. Please try again.",
          onSuccess,
        },
      );
    },
    [optimisticUpdates],
  );

  return {
    ...optimisticUpdates,
    optimisticDelete,
    optimisticUpdate,
    optimisticCreate,
  };
}
