import { useEffect, useRef } from 'react';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { TABULATOR_CONFIG } from '../../utils/constants';
import { getTableColumns } from './TableConfig';
import { setLastId } from '../../utils/idManager';

export const useTableInitialization = (data) => {
  const tableRef = useRef(null);
  const tabulatorRef = useRef(null);

  const initializeTable = (initialData) => {
    if (!tableRef.current) return;

    const maxId = Math.max(...initialData.map(task => task.id));
    setLastId(maxId);

    tabulatorRef.current = new Tabulator(tableRef.current, {
      ...TABULATOR_CONFIG,
      data: initialData,
      columns: getTableColumns((row) => row.delete())
    });
  };

  useEffect(() => {
    if (data) {
      initializeTable(data);
    }

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy();
      }
    };
  }, [data]);

  return { tableRef, tabulatorRef };
};