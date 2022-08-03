export interface TaskType {
  title: string;
  status: keyof typeof statusObj;
}

interface StatusObjKeyType {
  list: TaskType[];
  setFunc: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

interface StatusObjType {
  TODO: StatusObjKeyType;
  IN_PROGRESS: StatusObjKeyType;
  COMPLETED: StatusObjKeyType;
}

export const statusObj: StatusObjType = {
  TODO: { list: [], setFunc: () => {} },
  IN_PROGRESS: { list: [], setFunc: () => {} },
  COMPLETED: { list: [], setFunc: () => {} },
};
