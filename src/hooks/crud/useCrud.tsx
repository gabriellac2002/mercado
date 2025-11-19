import { DocumentData } from "firebase/firestore";
import { BaseEntity, Collections, CrudResult } from "./types";
import { useCallback, useState } from "react";
import { createEntity, deleteEntity, updateEntity } from "./actions";

export function useCrud<T extends DocumentData>(): CrudResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createItem = useCallback(
    async (
      collection: Collections,
      data: Omit<T, keyof BaseEntity>,
      successMessage?: string,
      onError?: () => void,
      onSuccess?: () => void
    ) => {
      setLoading(true);
      setError(null);

      const result = await createEntity<T>(collection, data, successMessage);

      if (!result.success) {
        setError(result.error || "Erro desconhecido");
        if (onError) onError();
        setLoading(false);
        return { success: false, error: result.error };
      }

      if (onSuccess) onSuccess();
      setLoading(false);
      return { success: true, id: result.data?.id };
    },
    []
  );

  const updateItem = useCallback(
    async (
      collection: Collections,
      id: string,
      data: Partial<Omit<T, keyof BaseEntity>>,
      successMessage?: string,
      notFoundMessage?: string,
      onError?: () => void,
      onSuccess?: () => void
    ) => {
      setLoading(true);
      setError(null);

      const result = await updateEntity<T>(
        collection,
        id,
        data,
        successMessage,
        notFoundMessage
      );

      if (!result.success) {
        setError(result.error || "Erro desconhecido");
        if (onError) onError();
        setLoading(false);
        return { success: false, error: result.error };
      }

      if (onSuccess) onSuccess();
      setLoading(false);
      return { success: true };
    },
    []
  );

  const deleteItem = useCallback(
    async (
      collection: Collections,
      id: string,
      successMessage?: string,
      notFoundMessage?: string,
      onError?: () => void,
      onSuccess?: () => void
    ) => {
      setLoading(true);
      setError(null);

      const result = await deleteEntity(
        collection,
        id,
        successMessage,
        notFoundMessage
      );

      if (!result.success) {
        setError(result.error || "Erro desconhecido");
        if (onError) onError();
        setLoading(false);
        return { success: false, error: result.error };
      }

      if (onSuccess) onSuccess();
      setLoading(false);
      return { success: true };
    },
    []
  );

  return {
    createItem,
    updateItem,
    deleteItem,
    loading,
    error,
  };
}
