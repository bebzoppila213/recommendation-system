import { useEffect, useState } from "react";

export default function useSort<T extends object>(defaultSortField: keyof T) {
  const [data, setData] = useState<T[]>([]);
  const [sortedField, setSortField] = useState<keyof T>(defaultSortField);

  useEffect(() => {
    if (data.length > 0) {
      const resSort = [...data].sort((item1: T, item2: T) => {
        const valueItem1 = item1[sortedField];
        const valueItem2 = item2[sortedField];
        if (typeof valueItem1 === "string" && typeof valueItem2 === "string") {
          return valueItem1.localeCompare(valueItem2);
        } else if (
          typeof valueItem1 === "number" &&
          typeof valueItem2 === "number"
        ) {
          return valueItem2 - valueItem1;
        }

        return 0;
      });
      setData(resSort);
    }
  }, [sortedField]);

  const updateSortField = (newSortedField: keyof T) => {
    setSortField(newSortedField);
  };

  return {
    data,
    setData,
    updateSortField,
  };
}
